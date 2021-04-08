# Solution for the Frontend Mentor - Interactive pricing component challenge

![Design preview for the Interactive pricing component coding challenge](./design/desktop-preview.jpg)

I have implemented my solution for the Interactive Pricing Component challenge by [Frontend Mentor](https://www.frontendmentor.io) using only HTLM, CSS/SASS and javascript.
The challenge consists in realizing a pricing component showing a different prices per number of views, according to the following schema:

- 10K pageviews / $8 per month
- 50K pageviews / $12 per month
- 100K pageviews / $16 per month
- 500k pageviews / $24 per month
- 1M pageviews / $36 per month

The pricing component has a checkbox slider for choosing a yearly payment instead of a monthly payment: in this case the price is reduced by 25%.

I realized a custom range slider built from scratch, rather than using the standard range slider input element, because the standard input range slider customization is not very well supported on all browsers at the moment (and because it was fun, obviously). <br>

The price slider updates the views following a non-linear increase in the number of views, according to the view tiers, corresponding to different 5 prices: at the extemes there are the minimum and the maximum number of views, while the rest of the slider is divided ideally in 4 sections: in the first section there is a proportional increase in views between 10K and 50K views, in the second between 50K and 100K, the third is between 100K and 500K, the last one is between 500K and 1 million views. When the number of views reaches a different tier for the corresponding price, the price updates consequently.

The component is responsive for mobile and desktop for width ranging from 250px to a full dekstop (1440 and over). <br>
The project picture for mobile are taken at 375px width, the deskop ones at 1440px, as required per challenge. <br>

You can see the project live at this [dedicated github page]();
