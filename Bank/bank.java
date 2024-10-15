import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

record Account(String accountNumber, String ownerName, double balance) {
    public Account deposit(double amount) {
        if (amount > 0) {
            var newBalance = balance + amount;
            System.out.printf("%.0f円が預け入れられました。新しい残高: %.0f円%n", amount, newBalance);
            return new Account(accountNumber, ownerName, newBalance);
        } else {
            System.out.println("無効な入金額です。");
            return this;
        }
    }

    public Account withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            var newBalance = balance - amount;
            System.out.printf("%.0f円が引き出されました。新しい残高: %.0f円%n", amount, newBalance);
            return new Account(accountNumber, ownerName, newBalance);
        } else {
            System.out.println("無効な引き出し額または残高不足です。");
            return this;
        }
    }
}

class Bank {
    private final List<Account> accounts = new ArrayList<>();

    public void addAccount(Account account) {
        accounts.add(account);
        System.out.println("新しい口座が作成されました。口座番号: " + account.accountNumber());
    }

    public Account findAccount(String accountNumber) {
        return accounts.stream()
                .filter(account -> account.accountNumber().equals(accountNumber))
                .findFirst()
                .orElse(null);
    }

    public void updateAccount(Account updatedAccount) {
        for (int i = 0; i < accounts.size(); i++) {
            if (accounts.get(i).accountNumber().equals(updatedAccount.accountNumber())) {
                accounts.set(i, updatedAccount);
                break;
            }
        }
    }

    public void listAccounts() {
        System.out.println("口座一覧:");
        accounts.forEach(account -> System.out.printf("口座番号: %s, 所有者: %s, 残高: %.0f円%n",
                account.accountNumber(), account.ownerName(), account.balance()));
    }
}

public class BankSystem {
    public static void main(String[] args) {
        var bank = new Bank();
        var scanner = new Scanner(System.in);

        while (true) {
            System.out.println("""

                    銀行システムメニュー:
                    1. 新規口座開設
                    2. 入金
                    3. 出金
                    4. 残高照会
                    5. 口座一覧表示
                    6. 終了
                    選択してください (1-6):""");

            int choice = scanner.nextInt();
            scanner.nextLine(); // 改行文字を消費

            switch (choice) {
                case 1 -> {
                    System.out.print("口座番号を入力してください: ");
                    var accountNumber = scanner.nextLine();
                    System.out.print("口座所有者名を入力してください: ");
                    var ownerName = scanner.nextLine();
                    System.out.print("初期残高を入力してください: ");
                    var initialBalance = scanner.nextDouble();
                    bank.addAccount(new Account(accountNumber, ownerName, initialBalance));
                }
                case 2, 3, 4 -> {
                    System.out.print("口座番号を入力してください: ");
                    var accNumber = scanner.nextLine();
                    var account = bank.findAccount(accNumber);
                    if (account == null) {
                        System.out.println("口座が見つかりません。");
                        break;
                    }
                    switch (choice) {
                        case 2 -> {
                            System.out.print("入金額を入力してください: ");
                            var amount = scanner.nextDouble();
                            var updatedAccount = account.deposit(amount);
                            bank.updateAccount(updatedAccount);
                        }
                        case 3 -> {
                            System.out.print("出金額を入力してください: ");
                            var amount = scanner.nextDouble();
                            var updatedAccount = account.withdraw(amount);
                            bank.updateAccount(updatedAccount);
                        }
                        case 4 -> System.out.printf("現在の残高: %.0f円%n", account.balance());
                    }
                }
                case 5 -> bank.listAccounts();
                case 6 -> {
                    System.out.println("銀行システムを終了します。");
                    scanner.close();
                    System.exit(0);
                }
                default -> System.out.println("無効な選択です。もう一度お試しください。");
            }
        }
    }
}
