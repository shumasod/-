import java.util.ArrayList;
import java.util.List;

// ... [Previous BankAccount, Bank, and BankingSystem classes remain unchanged] ...

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class BankAccountTest {
    @Test
    void testDeposit() {
        BankAccount account = new BankAccount("1001", "山田太郎", 10000);
        account.deposit(5000);
        assertEquals(15000, account.getBalance(), "預金後の残高が正しくありません");
    }

    @Test
    void testWithdraw() {
        BankAccount account = new BankAccount("1001", "山田太郎", 10000);
        account.withdraw(3000);
        assertEquals(7000, account.getBalance(), "引き出し後の残高が正しくありません");
    }

    @Test
    void testInvalidWithdraw() {
        BankAccount account = new BankAccount("1001", "山田太郎", 10000);
        account.withdraw(15000);
        assertEquals(10000, account.getBalance(), "残高不足の引き出しで残高が変更されています");
    }
}

class BankTest {
    @Test
    void testAddAndFindAccount() {
        Bank bank = new Bank();
        BankAccount account = new BankAccount("1001", "山田太郎", 10000);
        bank.addAccount(account);

        BankAccount foundAccount = bank.findAccount("1001");
        assertNotNull(foundAccount, "追加した口座が見つかりません");
        assertEquals("1001", foundAccount.getAccountInfo().split(",")[0].split(":")[1].trim(), "見つかった口座の番号が一致しません");
    }

    @Test
    void testFindNonExistentAccount() {
        Bank bank = new Bank();
        BankAccount foundAccount = bank.findAccount("9999");
        assertNull(foundAccount, "存在しない口座が見つかっています");
    }
}

// JUnitテストを実行するためのメインメソッド
public class TestRunner {
    public static void main(String[] args) {
        org.junit.platform.launcher.core.LauncherDiscoveryRequestBuilder.request()
            .selectors(org.junit.platform.engine.discovery.DiscoverySelectors.selectClass(BankAccountTest.class))
            .selectors(org.junit.platform.engine.discovery.DiscoverySelectors.selectClass(BankTest.class))
            .build();

        org.junit.platform.launcher.core.LauncherFactory.create().execute(request);
    }
}
