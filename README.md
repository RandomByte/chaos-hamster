# chaos-hamster :hamster:
This hamster randomly calls JavaScript functions on any website it's getting unleashed on.

It traverses through objects starting at `window` while randomly executing functions.

**Bookmarklet:**  
````js
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://randombyte.github.io/chaos-hamster/hamster.js';})();
`````

## Advanced usage
To let the Hamster run on a specific object (and its children):

````js
Hamster.halt(); // stop any currently running hamster
Hamster.run(window.target.object); // run hamster on window.target.object and any child-objects
````

## Credits
Inspired by [@Thodd](https://github.com/Thodd). Supported by [@matz3](https://github.com/matz3)
