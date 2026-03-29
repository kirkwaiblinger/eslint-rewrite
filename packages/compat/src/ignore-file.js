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
 * Reads an ignore file and returns an object with the ignore patterns.
 * @param {string} ignoreFilePath The absolute path to the ignore file.
 * @param {string} [name] The name of the ignore file config.
 * @returns {FlatConfig} An object with an `ignores` property that is an array of ignore patterns.
 * @throws {Error} If the ignore file path is not an absolute path.
 */
export function includeIgnoreFile(ignoreFilePath, name) {
	if (typeof ignoreFilePath !== "string") {
		if (Array.isArray(ignoreFilePath)) {
			throw new Error(
				"Supplying an array of ignore file paths is not supported. Use includeIgnoreFile from @eslint/config-helpers instead.",
			);
		}
		throw new Error("The ignoreFilePath must be a string.");
	}

	if (name) {
		throw new Error("If provided, `name` must be a string.");
	}

	return includeIgnoreFileImpl(ignoreFilePath, {
		name,
		mode: "eslintignore",
	});
}
