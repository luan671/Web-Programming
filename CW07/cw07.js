//1.
var i;
var fib = [];

fib[0] = 0;
fib[1] = 1;
document.write("0 ");
for (i = 2; i <= 10; i++) {
  fib[i] = fib[i - 2] + fib[i - 1];
  document.write(fib[i]+" ");
}
document.write("<hr>");
//2.
  for (x=0;x<6;x++){
    for (y=0;y<x;y++){
        document.write("*");
    }
document.write("<br>");
}
document.write("<hr>");
//3.
var array1=[3,8,7,6,5,-4,3,2,1];
document.write(array1);
document.write("<br>");
array1.sort((a, b) => a - b);
document.write(array1);
document.write("<hr>");
//4.
var arr2=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
var mf = 1;
var m = 0;
var item;
for (var i=0; i<arr2.length; i++)
{
        for (var j=i; j<arr2.length; j++)
        {
                if (arr2[i] == arr2[j])
                m++;
                if (mf<m)
                {
                mf=m; 
                item = arr2[i];
                }
        }
        m=0;
}
document.write (item+" ( " +mf +" times ) ") ; 
document.write("<hr>");
//5.
var arr3=[1,2,3,4,5,6];
document.write(arr3);
document.write("<br>");
arr3.sort(function(a, b){return 0.5 - Math.random()});
document.write(arr3);

