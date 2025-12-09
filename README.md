# Scope and Intuition

This is a client-side API connection inspired by two concepts in Rust: Result<T, E> and Tracing Subscriber.
We provide only GET and POST methods, which are written in consideration of further upgrade version.
The project is intended to be scalable and flexible routing.
By allowing arbitrary paths to our base URL and writing the logic separately as client and service layers.

In general use, when each request is completed the response results will be wrapped like this:

```typescript
if (data.error) {\
console.error("Error!")\
} else {\
console.log("Success")\
}
```

---

## How to run?

Type this in your command line:

'yarn dev'

Then, press 'ENTER' to run in development mode.

Example:

[DEBUG] Client initialized\
[Your transaction hash] : {\
tx_hash: '12fb877caf821e39d4dd1c9ab4ee0b22e8b5cd51ebdc5364eab67276da726390'\
}\
🖥️ Start Monitoring...\
[STATUS] Pending…\
[STATUS] Pending…\
[STATUS] Pending…\
[STATUS] Pending…\
[STATUS] CONFIRMED.\
✨ Done in 22.83s.

---

### Function to fulfil the requirements

1. Broadcast Transaction
   Using the POST method and sends payload to retrieve the transaction hash, it will be collected as variable for further use.
2. Transaction Status Monitoring
   I decided to categorize the status as ENUM and periodically fetch the status using a loop with a maximum retry limit. Each iteration will be delayed to mitigate intensive traffic load in the future.
