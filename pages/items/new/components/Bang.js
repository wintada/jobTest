// let a = [];

// for (let i = 0; i < 5; i++) {
//   let num = Math.floor(Math.random() * 15) + 1;
//   if(a.indexOf(num) == -1) {
//   a.push("b"+num);

// }
// for (let i = 0; i < 5; i++) {
//   let N = 30 - 16 + 1;
//   let num = Math.floor(Math.random() * N) + 16;
//   if( a.indexOf( num ) < 16 )
//   a.push("I" + num);
// }
// for (let i = 0; i < 4; i++) {
//   let N = 45 - 31 + 1;
//   let num = Math.floor(Math.random() * N) + 31;
//   if( a.indexOf( num ) < 31 )
//   a.push("N" + num);
// }
// for (let i = 0; i < 5; i++) {
//   let N = 60 - 46 + 1;
//   let num = Math.floor(Math.random() * N) + 46;
//   if( a.indexOf( num ) < 46 )
//   a.push("G" + num);
// }
// for (let i = 0; i < 5; i++) {
//   let N = 75 - 61 + 1;
//   let num = Math.floor(Math.random() * N) + 61;
//   if( a.indexOf( num ) < 61 )
//   a.push("O" + num);
// }
// }

function getCard() {
  let a = [];

  const bang = (str, max, min, d) => {
    for (let i = 0; i < d; ) {
      let mathr = str + (Math.floor(Math.random() * max) + min);
      if (!a.includes(mathr)) {
        a.push(mathr);
        i++;
      }
    }
  };
  bang("B", 15, 1, 5);
  bang("I", 15, 16, 5);
  bang("N", 15, 31, 4);
  bang("G", 15, 46, 5);
  bang("O", 15, 61, 5);

  return a;
}

// for (let i = 0; i < 5; ) {
//   let num = "B"+(Math.floor(Math.random() * 15) + 1);
//   if(!a.includes(num)) {
//   a.push(num)
//   i++
//   }
// }
// for (let i = 0; i < 5;) {
//   let N = 30 - 16 + 1;
//   let num = "I"+(Math.floor(Math.random() * N) + 16);
//   if(!a.includes(num)) {
//   a.push(num)
//   i++
//   }
// }
// for (let i = 0; i < 4; ) {
//   let N = 45 - 31 + 1;
//   let num = "N"+(Math.floor(Math.random() * N) + 31);
//   if(!a.includes(num)) {
//   a.push(num)
//     i++
//   }
// }
// for (let i = 0; i < 5;) {
//   let N = 60 - 46 + 1;
//   let num = "G"+(Math.floor(Math.random() * N) + 46);
//   if(!a.includes(num)) {
//   a.push(num)
//     i++
//   }
// }
// for (let i = 0; i < 5;) {
//   let N = 75 - 61 + 1;
//   let num = "O"+(Math.floor(Math.random() * N) + 61)
//   if(!a.includes(num)) {
//   a.push(num)
//     i++
//   }
// }

// return a

//   }
