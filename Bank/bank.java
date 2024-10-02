import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Account {
    private String accountNumber;
    private String ownerName;
    private double balance;

    public Account(String accountNumber, String ownerName, double initialBalance) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = initialBalance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println(amount + "円が預け入れられました。新しい残高: " + balance + "円");
        } else {
            System.out.println("無効な入金額です。");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            System.out.println(amount + "円が引き出されました。新しい残高: " + balance + "円");
        } else {
            System.out.println("無効な引き出し額または残高不足です。");
        }
    }
}

class Bank {
    private List<Account> accounts;

    public Bank() {
        accounts = new ArrayList<>();
    }

    public void addAccount(Account account) {
        accounts.add(account);
        System.out.println("新しい口座が作成されました。口座番号: " + account.getAccountNumber());
    }

    public Account findAccount(String accountNumber) {
        for (Account account : accounts) {
            if (account.getAccountNumber().equals(accountNumber)) {
                return account;
            }
        }
        return null;
    }

    public void listAccounts() {
        System.out.println("口座一覧:");
        for (Account account : accounts) {
            System.out.println("口座番号: " + account.getAccountNumber() + ", 所有者: " + account.getOwnerName() + ", 残高: " + account.getBalance() + "円");
        }
    }
}

public class BankSystem {
    public static void main(String[] args) {
        Bank bank = new Bank();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n銀行システムメニュー:");
            System.out.println("1. 新規口座開設");
            System.out.println("2. 入金");
            System.out.println("3. 出金");
            System.out.println("4. 残高照会");
            System.out.println("5. 口座一覧表示");
            System.out.println("6. 終了");
            System.out.print("選択してください (1-6): ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // 改行文字を消費

            switch (choice) {
                case 1:
                    System.out.print("口座番号を入力してください: ");
                    String accountNumber = scanner.nextLine();
                    System.out.print("口座所有者名を入力してください: ");
                    String ownerName = scanner.nextLine();
                    System.out.print("初期残高を入力してください: ");
                    double initialBalance = scanner.nextDouble();
                    bank.addAccount(new Account(accountNumber, ownerName, initialBalance));
                    break;
                case 2:
                case 3:
                case 4:
                    System.out.print("口座番号を入力してください: ");
                    String accNumber = scanner.nextLine();
                    Account account = bank.findAccount(accNumber);
                    if (account == null) {
                        System.out.println("口座が見つかりません。");
                        break;
                    }
                    if (choice == 2) {
                        System.out.print("入金額を入力してください: ");
                        double amount = scanner.nextDouble();
                        account.deposit(amount);
                    } else if (choice == 3) {
                        System.out.print("出金額を入力してください: ");
                        double amount = scanner.nextDouble();
                        account.withdraw(amount);
                    } else {
                        System.out.println("現在の残高: " + account.getBalance() + "円");
                    }
                    break;
                case 5:
                    bank.listAccounts();
                    break;
                case 6:
                    System.out.println("銀行システムを終了します。");
                    scanner.close();
                    System.exit(0);
                default:
                    System.out.println("無効な選択です。もう一度お試しください。");
            }
        }
    }
}
