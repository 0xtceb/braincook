import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signIn(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password));
  }

  signInGoogle(): Observable<firebase.auth.UserCredential> {
    return from(
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    );
  }

  signUp(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(
      this.fireAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      map((user: firebase.auth.UserCredential) => {
        this.SendVerificationMail().subscribe();
        return user;
      })
    );
  }

  SendVerificationMail(): Observable<void> {
    return from(this.fireAuth.currentUser).pipe(
      switchMap((user: firebase.User) => {
        return from(user.sendEmailVerification());
      })
    );
  }

  signOut(): Observable<void> {
    return from(this.fireAuth.signOut());
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
}
