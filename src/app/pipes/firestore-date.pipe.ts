import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firestoreDate'
})
export class FirestoreDatePipe implements PipeTransform {

  transform(value: any): string {

    if (!value) {
      return '';
    }

    let date: Date;

    // Firestore Timestamp
    if (value.seconds !== undefined) {
      date = new Date(value.seconds * 1000);
    }
    // JavaScript Date
    else if (value instanceof Date) {
      date = value;
    }
    // Anything else that Date can parse
    else {
      date = new Date(value);
    }

    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);

  }

}