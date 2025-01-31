const ConsoleProxy = new Proxy(console, {
    
    get(target, property) {
        if (typeof target[property] === 'function') {
            return (...args) => {
                const timestamp = new Date().toISOString();
                target[property](`[${timestamp}]`, ...args);
            };
        }
        return target[property];
    }
});

// Use the proxy object for logging
ConsoleProxy.log("Hello, World!");
ConsoleProxy.error("An error occurred");
ConsoleProxy.info("This is an info log");
ConsoleProxy.debug("Debugging...");
