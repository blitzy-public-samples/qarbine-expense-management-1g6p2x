// Receipt model definition for handling receipt data within the Expense Management Service.
// This model represents the structure and attributes of receipt data, which is used for processing,
// validation, and storage of receipts associated with expense reports.
//
// Requirements Addressed:
// - Expense Submission (Technical Specification/13.2 Expense Submission)
//   Enable employees to efficiently capture and submit travel expenses through user-friendly mobile
//   and web interfaces, incorporating automated data extraction and currency support.

export class Receipt {
    // Unique identifier for the receipt.
    id: string;

    // Identifier of the associated expense report.
    expenseId: string;

    // URL of the uploaded receipt image.
    imageUrl: string;

    // Amount of the expense noted on the receipt.
    amount: number;

    // Currency of the expense amount.
    currency: string;

    // Date when the expense occurred.
    date: Date;

    /**
     * Initializes a new instance of the Receipt class with the provided attributes.
     *
     * Steps:
     * - Assign the provided id to the receipt.
     * - Assign the provided expenseId to the receipt.
     * - Assign the provided imageUrl to the receipt.
     * - Assign the provided amount to the receipt.
     * - Assign the provided currency to the receipt.
     * - Assign the provided date to the receipt.
     *
     * @param id - Unique identifier for the receipt.
     * @param expenseId - Identifier of the associated expense report.
     * @param imageUrl - URL of the uploaded receipt image.
     * @param amount - Amount of the expense.
     * @param currency - Currency in which the expense was made.
     * @param date - Date when the expense occurred.
     */
    constructor(
        id: string,
        expenseId: string,
        imageUrl: string,
        amount: number,
        currency: string,
        date: Date
    ) {
        this.id = id;
        this.expenseId = expenseId;
        this.imageUrl = imageUrl;
        this.amount = amount;
        this.currency = currency;
        this.date = date;
    }
}