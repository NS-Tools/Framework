/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/** 
 * Reexport Logger exports from ./Logger
 * @deprecated Use direct imports from './Logger' instead.
 */
export {
    type Appender,
    addAppender,
    addCustomLevel,
    clearAppenders,
    getAppenders,
    getLevel,
    getLogger,
    Logger,
    logLevel,
    removeAppender,
    removeCustomLevel,
    setLevel,
    correlationId,
    includeCorrelationId,
    setIncludeCorrelationId,
    ExecutionLogAppender,
    autolog,
    autoLogMethodEntryExit,
    AutoLogConfig,
    DefaultLogger,
    setCorrelationId
} from './Logger';