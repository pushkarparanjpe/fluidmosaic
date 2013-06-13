
class foobj
	
	a = 0
	
	foo : () ->
		console.log a
		a += 1
	foo2 : () ->
		console.log a
fo = new foobj()
fo.foo()
fo.foo2()
