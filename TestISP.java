public class TestISP {
    public static void main(String[] args) {
        Weapon quirk = () -> System.out.println("Deliver fireball");
        quirk.attack();
    }
    
}
