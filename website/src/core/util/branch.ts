import { Observable, Subscription } from 'rxjs';

/**
 * Branches one observable to different target subscriptions
 *
 * @param source The source observable to branch from
 * @param targets The functions creating the branches of the source observable
 * @returns A list of subscriptions created within the branches
 */
export function branch<T>(source: Observable<T>, ...targets: Array<(target: Observable<T>) => Subscription>): Subscription[] {
  return targets
    .map<Subscription>(target => target(source));
}