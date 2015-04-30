<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress-alex');

/** MySQL database username */
define('DB_USER', 'alex');

/** MySQL database password */
define('DB_PASSWORD', 'overlord');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '9ScA4QvO|e,`=%bC){VV#KFAES^:JDy#B2=jMR;F&4hH7_~K_a]7/7k&qF}Y:v.k');
define('SECURE_AUTH_KEY',  ',a3/Z1&l%-uWJ8?:&C,0u6cKSLr?$weM86dn8?dScXdS] &/=g1+F+]m>y{d(QMz');
define('LOGGED_IN_KEY',    'c/+t5J}8GYfGyn}& ,j@+:/6_hPys#pU42O37c/fl[)5{;e9ZR@){Dj/ZzmpzC8g');
define('NONCE_KEY',        'auK<&X62Xq;O(#Nx+ms<*gXG L3> =O@]sjQYN={{uK,;_g|$sK~-hK]+z|<BMvn');
define('AUTH_SALT',        '^$+q Jw+.ClY-R&miOiSz#&*6#9xlT &4_(&.Pz/ORcAZ=:9I0df&mmJ0~#V wXm');
define('SECURE_AUTH_SALT', '%$K_^bIM7Swi<TVemi|c+G(I5UkmOhd^]Pf~&lK_;-tfi3j[i~trL/++I*W.zNw,');
define('LOGGED_IN_SALT',   '8el:T@84z~B@O5~^/feI7S-4Pw<5(|&_U#xXq^2+?(`W+iI}|^5sR;jTpRuuTgZG');
define('NONCE_SALT',       'Q-Z*G)!s*U{{+>P5P%*7xSSiK5%+ F*KRL*JD`?Fa@;9Hm9}((Gx<Ka(!SqCr!-3');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
