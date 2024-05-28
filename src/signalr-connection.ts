
import * as signalR from "@microsoft/signalr";
const URL = process.env.HUB_ADDRESS ?? "https://payment-checkout-dev.azurewebsites.net/paymentHub";//"https://localhost:7152/paymentHub"; // or whatever your backend port is

class Connector {
    private connection: signalR.HubConnection;
    public events: (onPaymentNotification: (response: HubResponse) => void) => void;
    static instance: Connector;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();

        this.connection.start().catch(err => document.write(err));

        this.events = (onPaymentNotification) => {
            this.connection.on("PaymentNotification", (response: HubResponse) => {
                console.log(response);
                onPaymentNotification(response);
            });
        };
    }

    public sendPaymentNotification = (payment: string) => {
        this.connection.send("PaymentNotification", payment)
            .then(() => console.log("Payment notification sent"))
            .catch(err => console.error(err));
    }

    public static getInstance(): Connector {
        if (!Connector.instance) {
            Connector.instance = new Connector();
        }
        return Connector.instance;
    }
}

export default Connector.getInstance;

// Define the HubResponse type
interface HubResponse {
    success: boolean;
    message: string;
}

    // import * as signalR from "@microsoft/signalr";
    // const URL = process.env.HUB_ADDRESS ?? "https://localhost:5001/hub"; //or whatever your backend port is
    // class Connector {
    //     private connection: signalR.HubConnection;
    //     public events: (onMessageReceived: (username: string, message: string) => void) => void;
    //     static instance: Connector;
    //     constructor() {
    //         this.connection = new signalR.HubConnectionBuilder()
    //             .withUrl(URL)
    //             .withAutomaticReconnect()
    //             .build();
    //         this.connection.start().catch(err => document.write(err));
    //         this.events = (onMessageReceived) => {
    //             this.connection.on("messageReceived", (username, message) => {
    //                 onMessageReceived(username, message);
    //             });
    //         };
    //     }
    //     public newMessage = (messages: string) => {
    //         this.connection.send("newMessage", "foo", messages).then(x => console.log("sent"))
    //     }
    //     public static getInstance(): Connector {
    //         if (!Connector.instance)
    //             Connector.instance = new Connector();
    //         return Connector.instance;
    //     }
    // }
    
    // export default Connector.getInstance;