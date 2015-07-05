=== Mobile Navigation ===
Contributors: Jenst
Tags: mobile, navigation, menu, responsive, nav
Requires at least: 4.1
Tested up to: 4.1
Stable tag: 1.5
License: GPLv2
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A responsive fullscreen mobile menu navigation. Activate it for your custom made theme to save some time.

== Description ==

Settings:

* Mobile location
* Mobile breakpoint
* Background color
* Text brightness
* Logo as text or image
* Logo and menu font family
* Disable navigation, menu location, CSS, javascript
* Hide on scroll, on or off
* Custom CSS

If you don't want the HTML to go through the action wp_footer, place this somewhere after the beginning of your body-tag: `<?php do_action('mn_nav'); ?>`. It might be better for readability and perhaps SEO.

== Installation ==

1. Upload `mobile-navigation` folder to the `/wp-content/plugins/` directory, or use the plugin installer in wp-admin.
1. Activate the plugin through the 'Plugins' menu in WordPress.
1. Go to `Options` > `Mobile Navigation` and set your settings. Be sure to choose a menu that is not empty.

== Frequently Asked Questions ==

= Does Mobile Navigation work with every theme? =

No. Some themes has some strange CSS and javascript. If another mobile menu tries to be on top there might be a conflict.

= Why not put more settings? =

I try to keep the settings down. It should just be enough to adapt it to your site in terms of colors and fonts.

= Why doesn't it work? =

Make sure you have the actions wp_head() and wp_footer() in your theme. If you have too large screen compared to the breakpoint in your settings the menu is not shown.

= Why is the CSS generated as file?

It's not a good practice to have CSS generated inline. You can disable the CSS if you prefer adding your own.

== Screenshots ==

1. Closed mobile navigation
2. Open fullscreen mobile navigation
3. General settings
4. Logo settings
5. Advanced settings

== Changelog ==

= 1.5 =
* CSS inline option - Use only if file and folders are not writable
* If no breakpoint set, it will be set to 600px

= 1.4 =
* Added warning when file not writable
* Setting to set text dark or bright
* Optional. Put <?php do_action('mn_nav'); ?> directly after <body> in your theme. Then the mobile menu HTML will be put there instead of the footer. Might be good for readability and perhaps SEO.

= 1.3 =
* Bug fixes.

= 1.2 =
* Initial release on wordpress.org

= 1.1 =
* Many bugs fixed.

= 1.0 =
* A not so public release.