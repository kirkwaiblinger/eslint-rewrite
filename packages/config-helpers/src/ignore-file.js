/**
 * @fileoverview Ignore file utilities for the compat package.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

export { convertIgnorePatternToMinimatch } from "@eslint/core";
import { includeIgnoreFileImpl } from "@eslint/core";

//-----------------------------------------------------------------------------
// Types
//-----------------------------------------------------------------------------

/** @typedef {import("@eslint/core").ConfigObject} FlatConfig */

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

/**
 * @overload
 *
 * Reads an ignore file and returns an object with the ignore patterns.
 * @param {string} ignoreFilePathArg The absolute path to the ignore file.
 * @param {object} [options]
 * @param {string} [options.name] The name of the config object
 * @param {'eslintignore' | 'gitignore'} [options.mode] Whether to parse the ignore patterns
 *        relative to the config file (eslintrc) or to the ignore file (gitignore).
 * @returns {FlatConfig} An object with an `ignores` property that is an array of ignore patterns.
 * @throws {Error} If the ignore file path(s) is(are) not an absolute path(s).
 */

/**
 * @overload
 *
 * Reads an array of ignore files and returns objects with the ignore patterns.
 * @param {Array<string>} ignoreFilePathArg The absolute paths to the ignore files.
 * @param {object} [options]
 * @param {string} [options.name] The name of the config objects
 * @param {'eslintignore' | 'gitignore'} [options.mode] Whether to parse the ignore patterns
 *        relative to the config file (eslintrc) or to the ignore file (gitignore).
 * @returns {FlatConfig[]} An array of objects with an `ignores` property that is an array of ignore patterns.
 * @throws {Error} If the ignore file path(s) is(are) not an absolute path(s).
 */

/**
 * @overload
 *
 * Reads an ignore file or array of ignore files and returns an object(s) with the ignore patterns.
 * @param {string | Array<string>} ignoreFilePathArg The absolute path(s) to the ignore file(s).
 * @param {object} [options]
 * @param {string} [options.name] The name of the config object(s)
 * @param {'eslintignore' | 'gitignore'} [options.mode] Whether to parse the ignore patterns
 *        relative to the config file (eslintrc) or to the ignore file (gitignore).
 * @returns {FlatConfig[] | FlatConfig} An array of objects with an `ignores` property that is an array of ignore patterns.
 * @throws {Error} If the ignore file path(s) is(are) not an absolute path(s).
 */

/**
 * Reads an ignore file or array of ignore files and returns an object(s) with the ignore patterns.
 * @param {string | Array<string>} ignoreFilePathArg The absolute path(s) to the ignore file(s).
 * @param {object} [options]
 * @param {string} [options.name] The name of the config object(s)
 * @param {'eslintignore' | 'gitignore'} [options.mode] Whether to parse the ignore patterns
 *        relative to the config file (eslintrc) or to the ignore file (gitignore).
 * @returns {FlatConfig[] | FlatConfig} An array of objects with an `ignores` property that is an array of ignore patterns.
 * @throws {Error} If the ignore file path(s) is(are) not an absolute path(s).
 */
export function includeIgnoreFile(ignoreFilePathArg, options) {
	const normalizedMode = options?.mode || "eslintignore";
	if (
		!(normalizedMode === "eslintignore" || normalizedMode === "gitignore")
	) {
		throw new Error(`Unrecognized mode ${normalizedMode}`);
	}

	const normalizedName =
		options?.name || `Imported .${normalizedMode} patterns`;

	if (Array.isArray(ignoreFilePathArg)) {
		return ignoreFilePathArg.map((ignoreFilePath, i) =>
			includeIgnoreFileImpl(ignoreFilePath, {
				name: `${normalizedName} (${i})`,
				mode: normalizedMode,
			}),
		);
	}

	return includeIgnoreFileImpl(ignoreFilePathArg, {
		name: normalizedName,
		mode: normalizedMode,
	});
}
