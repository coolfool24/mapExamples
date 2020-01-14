import { from, pipe, of, Observable } from 'rxjs';
import { map, delay, mergeMap, concatMap, switchMap } from 'rxjs/operators';

// run the following to see how each type of map handles inner observables

const quickStream = from([1,2,3,4,5,6,7,8]);

// quickStream.pipe(
//     map(num => transform(num))
// ).subscribe(val => console.log(val, ' : from Map'));

function transform (num: any): Observable<any> {
    return of(num).pipe(
        delay(Math.floor(Math.random() * 1000))
    );
};

quickStream.pipe(
    mergeMap(val => transform(val))
).subscribe(val => console.log(val, ' : from MERGEmap'));

quickStream.pipe(
    switchMap(val => transform(val))
).subscribe(val => console.log(val, ' : from SWITCHMap'));

quickStream.pipe(
    concatMap(val => transform(val))
).subscribe(val => console.log(val, ' : from concatMap'));