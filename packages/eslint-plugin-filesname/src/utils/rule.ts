/**
 * @file Utils about rule
 * @author David Ratier, Duke Luo
 */
'use strict';

import micromatch from 'micromatch';
import { isNil, isEmpty } from './utility';
import { PREFINED_MATCH_SYNTAX_REGEXP } from '../constants/regex';
import { PREFINED_MATCH_SYNTAX_ERROR_MESSAGE } from '../constants/message';
import NAMING_CONVENTION from '../constants/naming-convention';

/**
 * Takes in a rule and transforms it if it contains prefined match syntax
 *
 * @typedef {string} filenamePattern original filename pattern
 * @typedef {string} namingPattern original naming pattern
 * @typedef {[filenamePattern, namingPattern]} rule
 * @param {rule} rule original rule
 * @param {string} filenameWithPath filename with path
 * @returns {rule} new rule
 * @throws {Error} if a prefined match syntax referenced in the naming pattern is not found in the filename pattern
 */
const transformRuleWithPrefinedMatchSyntax = (
  [filenamePattern, namingPattern],
  filenameWithPath
) => {
  const keyCaptureGroups = micromatch.capture(
    filenamePattern,
    filenameWithPath
  );

  if (isNil(keyCaptureGroups)) {
    return [filenamePattern, namingPattern];
  }

  const valueCaptureGroups = [
    ...namingPattern.matchAll(new RegExp(PREFINED_MATCH_SYNTAX_REGEXP, 'g')),
  ];

  if (isEmpty(valueCaptureGroups)) {
    return [filenamePattern, namingPattern];
  }

  const newNamingPattern = valueCaptureGroups.reduce((value, group) => {
    const groupIndex = +group[1];

    if (isNil(keyCaptureGroups[groupIndex])) {
      throw new Error(
        PREFINED_MATCH_SYNTAX_ERROR_MESSAGE(namingPattern, filenamePattern)
      );
    }

    return value.replace(group[0], keyCaptureGroups[groupIndex]);
  }, namingPattern);

  return [filenamePattern, newNamingPattern];
};

/**
 * @returns {object | undefined} undefined or object with non-matching file path and naming pattern
 * @param {string} filePath file path
 * @param {string} targetFilePathPattern path pattern of the target file
 * @param {string} [targetNaming] target naming
 * @param {string} [targetNamingPattern] naming pattern of the target naming
 */
const matchRule = (
  filePath,
  targetFilePathPattern,
  targetNaming = null,
  targetNamingPattern = null
) => {
  if (!micromatch.isMatch(filePath, targetFilePathPattern)) {
    return;
  } else if (
    targetNaming &&
    targetNamingPattern &&
    micromatch.isMatch(
      targetNaming,
      NAMING_CONVENTION[targetNamingPattern] || targetNamingPattern
    )
  ) {
    return;
  } else {
    return {
      path: filePath,
      pattern: targetNamingPattern,
    };
  }
};

export {
  transformRuleWithPrefinedMatchSyntax,
  matchRule,
};
