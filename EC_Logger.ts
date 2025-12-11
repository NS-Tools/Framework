/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

/**
 * Reexport Logger exports from ./utility/Logger
 * @deprecated Use direct imports from './utility/Logger' instead.
 */
export {
	type Appender,
	AutoLogConfig,
	addAppender,
	addCustomLevel,
	autoLogMethodEntryExit,
	autolog,
	clearAppenders,
	correlationId,
	DefaultLogger,
	ExecutionLogAppender,
	getAppenders,
	getLevel,
	getLogger,
	includeCorrelationId,
	Logger,
	logLevel,
	removeAppender,
	removeCustomLevel,
	setCorrelationId,
	setIncludeCorrelationId,
	setLevel,
} from './utility/Logger';
