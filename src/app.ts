showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

type Book = {
    id: number;
    title: string;
    category: Category,
    author: string;
    available: boolean;
};

enum Category {
    JavaScript,
    CSS,
    TypeScript,
    Angular,
    React,
};

const getAllBooks = (): Book[] => {
    const books = [
        {
            id: 1,
            title: 'Refactoring JavaScript',
            category: Category.JavaScript,
            author: 'Evan Burchard',
            available: true,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            category: Category.JavaScript,
            author: 'Liang Yuxian Eugene',
            available: false,
        },
        {
            id: 3,
            title: 'CSS Secrets',
            category: Category.CSS,
            author: 'Lea Verou',
            available: true,
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            category: Category.JavaScript,
            author: 'Andrea Chiarelli',
            available: true,
        },
    ];

    return books;
};

const calcTotalPages = (): number => {
    const data = [
        {
            lib: 'libName1',
            books: 1_000_000_000,
            avgPagesPerBook: 250,
        },
        {
            lib: 'libName2',
            books: 5_000_000_000,
            avgPagesPerBook: 300,
        },
        {
            lib: 'libName3',
            books: 3_000_000_000,
            avgPagesPerBook: 280,
        },
    ];

    return data.reduce((acc: number, { books, avgPagesPerBook}) => acc + books * avgPagesPerBook, 0);
};

const logFirstAvailable = (books: Book[]): void => {
    const booksCount = books.length;
    const firstBookTitle = books.find(({ available }: Book) => available)?.title;
    console.log(booksCount);
    console.log(firstBookTitle);
};

const getBookTitlesByCategory = (category: Category): string[] => {
    const books = getAllBooks();
    return books.filter((book: Book) => book.category === category).map((book: Book) => book.title);
};

function logBookTitle(titles: string[]): void {
    titles.forEach((title: string) => console.log(title));
};

const getBooksAuthorsByIndex = (index: number): [string, string] => {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
};
// Task 02.01
// logFirstAvailable(getAllBooks());
// const titles = getBookTitlesByCategory(Category.JavaScript);
// logBookTitle(titles);
// console.log(getBooksAuthorsByIndex(1));
// console.log(calcTotalPages());

// 04.02
interface DamageLogger {
    (reason: string): void;
}
let logDamage: DamageLogger;
logDamage = (reason: string) => console.log(`Damaged: ${reason}`);
// logDamage('click');

// 04.03
interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

const favoriteAuthor: Author = {
    name: 'Andrii',
    email: 'andri@gmail.com',
    numBooksPublished: 15,
};

const favoriteLibrarian: Librarian = {
    name: 'Anna',
    email: 'anna@example.com',
    department: 'Classical literature',
    assistCustomer: (custName: string) => console.log(custName),
};
// 04.03
const offer: any = {
    book: {
        title: 'TS in depth',
    }
};
// console.log(offer.magazine);
// console.log(offer.book?.getTitle?.());
// console.log(offer.book?.author?.[0]);

// 04.05
type BookProperties = keyof Book;
const getProperty = (book: Book, prop: BookProperties): any => {
    if (typeof book[prop] === 'function') {
        const f = book[prop] as Function;
        return f.name;
    }
    return book[prop];
};
// const prop = 'title';
// const [book] = getAllBooks();
// const bookProperty = getProperty(book, prop);
// console.log(bookProperty);

// 04.05
class ReferenceItem {
    // title: string;
    // year: number;
    //
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    static department: string = 'Classic literature';

    private _publisher: string;
    // @ts-ignore
    #id: number;

    get publisher(): string {
        // eslint-disable-next-line no-underscore-dangle
        return this._publisher.toUpperCase();
    }

    get getID(): number {
        return this.#id;
    }

    set publisher(newPublisher: string) {
        // eslint-disable-next-line no-underscore-dangle
        this._publisher = newPublisher;
    }

    constructor(
        id: number,
        public title: string,
        protected year: number,
    ) {
        this.#id = id;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(ReferenceItem.department);
    }
}

// 05.01
const ref: ReferenceItem = new ReferenceItem(111, 'I love TS', 2021);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'Guardian';
// console.log(ref.publisher);
// console.log(ref.getID);

// 05.02
class Encyclopedia extends ReferenceItem {
    constructor(
        id: number,
        title: string,
        year: number,
        public edition: number,
    ) {
        super(id, title, year);
    }

    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} ${this.year}`);
    }
}
const refBook = new Encyclopedia(111, 'I love TS', 2021, 2);
console.log(refBook);
console.log(refBook.printItem());