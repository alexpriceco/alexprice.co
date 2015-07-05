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
define('DB_NAME', 'ayouthmind');

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
define('AUTH_KEY',         'Q-P}OXR=pvVe^,^u[-hyc+x9pBDFIZ{JN+!!GoP|g|!Gw&MDq*D,i`;_7e%uci5t');
define('SECURE_AUTH_KEY',  'bAP2Zbh%71w_A>A0_T+r2GrHQ%R,2+<_8< ?u:)Q-%fDygOkjyE+|AY$Y4C M+[S');
define('LOGGED_IN_KEY',    '7x_s/SikQfw_#l0+bZ@rq_FX*=aRRA+[dMbQ;QzJ,fp8VulY.,BF0xH}]t^5H;62');
define('NONCE_KEY',        'Vw#@,~,F}x6-0$+3../b5~un}6WylGv@Z0UAibE4-t}Qk[[/9(L3&Ad>k@%Gh>@u');
define('AUTH_SALT',        'd)xeoJ:nu]z$z^fg.uI-+DITX#e,h39fX#D>^)qy0)0c ?HA +b~k]L1Lu,A|g6/');
define('SECURE_AUTH_SALT', 'Mp)}p4t9-/gw`z%:>?q~Kt]vK15(W|~w=]uqZN+a$g7::w&r$B/:L;(qcx2WjHhr');
define('LOGGED_IN_SALT',   'L1r_tiPObvR I86dE_uBR3syF1GqFbN>B]J@!LW]y1qp>uUo3Gp-R_AV+tH~L1mn');
define('NONCE_SALT',       '#,*khbH+,I/H%?yOa-*@,AMF%oB2!^L3E**0=fc)8LcwPG(?2ce}|[GT|*-9WhMp');

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
