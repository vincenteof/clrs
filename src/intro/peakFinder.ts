/**
 * Position 2 is a peak if and only if b >+ a and b >= c. Position 9 is a peak if i >= h.
 *    1 2 3 4 5 6 7 8 9
 *    a b c d e f g h i
 *
 * a is a 2D-peak iff a ≥ b, a ≥ d, a ≥ c, a ≥ e
 *      c
 *    b a d
 *      e
 */

export function find(array: number[]): number
export function find(
  array: number[][],
  rowLength: number,
  colLength: number
): [number, number]

export function find(...args: any[]) {
  const [array, rowLength, colLength] = args
  if (isFinite(rowLength) && isFinite(colLength)) {
    return findFor2D(array, rowLength, colLength)
  }
  return findFor1D(array)
}

function findFor1D(array: number[]) {
  let l = 0
  let r = array.length // element in position r is not included
  while (l < r) {
    const mid = calMid(l, r)
    const midL = mid - 1
    const midR = mid + 1
    const lMatched = midL < 0 || array[mid] >= array[midL]
    const rMatched = midR >= array.length || array[mid] >= array[midR]
    if (lMatched && rMatched) {
      return mid
    }
    if (!lMatched) {
      r = mid
    } else {
      l = midR
    }
  }
  return -1
}

function findFor2D(array: number[][], rowLength: number, colLength: number) {
  let colL = 0
  let colR = colLength
  while (colL < colR) {
    const colMid = calMid(colL, colR)
    let rowPos = -1
    let max = Number.MIN_SAFE_INTEGER
    for (let i = 0; i < rowLength; i++) {
      if (array[i][colMid] > max) {
        rowPos = i
        max = array[i][colMid]
      }
    }
    const colMidLeft = colMid - 1
    const colMidRight = colMid + 1
    const lMatched =
      colMidLeft < 0 || array[rowPos][colMid] >= array[rowPos][colMidLeft]
    const rMatched =
      colMidRight >= rowLength ||
      array[rowPos][colMid] >= array[rowPos][colMidRight]
    if (lMatched && rMatched) {
      return [rowPos, colMid]
    }
    if (!lMatched) {
      colR = colMid
    } else {
      colL = colMidRight
    }
  }
  return [-1, -1]
}

function calMid(start: number, end: number) {
  return start + Math.floor((end - start) / 2)
}
