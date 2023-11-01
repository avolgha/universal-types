#### Java

Note for Union-types because we cannot really produce them in Java. I think we
need to add an empty `interface` which we can implement in every given union
member.  
**This has one downside**: We cannot include *built-in types* like integers and
so on. Maybe then print a warning if we have them in the union?

> ```text
> object TestObject { ... };
>
> union TestUnion = TestObject | ...;
> ```
> 
> Would need to output to
>
> ```java
> public interface TestUnion { /* empty */ }
>
> public class TestObject
>        implements TestUnion { ... }
> ```