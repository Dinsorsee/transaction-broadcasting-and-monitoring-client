# Scope and Intuition

This is a client-side API connection inspired by two concepts in Rust: Result<T, E> and Tracing Subscriber.
We only provide GET and POST methods, these are written in consideration of further upgrade version.
A project is intended to be scalable and flexible.
To support flexible routing by allowing arbitrary paths to our base URL, the logic is written separately as client and service layers.

In general use, when each request is completed. We will wrap the response result like this.

if (data.error) {
console.error("Error!")
} else {
console.log("Success")
}

## How to run?

Type this in your command line.

'yarn dev'

Then press 'ENTER' to run in development mode.

Example :

[DEBUG] Client initialized
[Your transaction hash] : {
tx_hash: '12fb877caf821e39d4dd1c9ab4ee0b22e8b5cd51ebdc5364eab67276da726390'
}
🖥️ Start Monitoring...
[STATUS] Pending…
[STATUS] Pending…
[STATUS] Pending…
[STATUS] Pending…
[STATUS] CONFIRMED.
✨ Done in 22.83s.

### Function to fulfil the requirements

1. Broadcast Transaction
   Using POST Method and sends payload to retrieve the transaction hash.
   The returned transaction hash will collect as variable for further use.
2. Transaction Status Monitoring
   I decided to categorize the status as ENUM, then periodically fetching the status using the loop with maximum retries limit. Each iteration will be awaited for 5 seconds to mitigate intensive traffic load in the future.
