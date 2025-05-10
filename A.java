import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
public class A {
    public static void main(String[] args)
    {
        C.B b = new C.B();
        C c = new C();
        C.D d = c.new D();

        Consumer<List<Integer>> lstIterator = lst -> {for(int i = 0; i < lst.size(); i++)
        {
            System.out.println(2* lst.get(i));
        }};
        lstIterator.accept(Arrays.asList(1,2,3,4,5)); //sysout is executed here.
    }
    A(){

    }
}

class C{
    static class B{
        B(){

        }
    }

    class D{

    }

}
