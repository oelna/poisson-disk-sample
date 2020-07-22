# Poisson Disk Sample

A Javascript implementation of Poisson Disk Sampling (original by [Jeffrey Hearn](https://github.com/jeffrey-hearn/poisson-disk-sample))

I modified the demo code to skip the jQuery requirement and also made it use a `<svg>` container, instead of a `<canvas>` element. This required multiple adjustments to the code, but now you can simply print the page to get a nice PDF with random line art.

I also made it output connecting lines between the nodes, since I needed that for a project. The points can still be shown and/or formatted via CSS.

I intend to make a few more changes, if time permits. These will be to make the demo interface more flexible, maybe with UI elements to change the drawing parameters.

The original generator code in `poisson-disk.js` remains untouched, as it is way over my head.

[See it in action!](https://oelna.github.io/poisson-disk-sample/)

This project is released under the MIT License.
