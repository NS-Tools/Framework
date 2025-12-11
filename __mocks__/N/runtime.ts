/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

export const getCurrentScript = jest
	.fn()
	.mockName('getCurrentScript')
	.mockReturnValue({
		getRemainingUsage: jest.fn().mockName('getRemainingUsage'),
	});
