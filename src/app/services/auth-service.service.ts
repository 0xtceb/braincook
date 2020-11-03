import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
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
        this.SendVerificationMail().subscribe((_) => {
          console.log('mail sent');
        });
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
}
