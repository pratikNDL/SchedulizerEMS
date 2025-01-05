export function lowerBound(arr:Array<number>, target: number) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) left = mid + 1; 
      else right = mid -1; 
    }
    return left; 
}