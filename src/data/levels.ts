export const EntityBlock = 0;
export const EntityStart = 1;
export const EntityEnd = 2;
export const EntityTurnOneSide = 3;
export const EntityTurnBothSides = 4;
export const EntitySplit = 5;
export const EntityTunnel = 6;
export const EntityCollectable = 7;

export const Rotation0 = 0;
export const Rotation90 = 1;
export const Rotation180 = 2;
export const Rotation270 = 3;

/** [width, height] */
export type LevelSize = [number, number];
export type EntityType = typeof EntityBlock | typeof EntityStart | typeof EntityEnd | typeof EntityTurnOneSide | typeof EntityTurnBothSides | typeof EntitySplit | typeof EntityTunnel | typeof EntityCollectable;
export type Rotation = typeof Rotation0 | typeof Rotation90 | typeof Rotation180 | typeof Rotation270;
export type Entity = [EntityType, Rotation, (Rotation | null)[]?] | undefined;


export type Level = [LevelSize, Entity[]];

const Empty: any = undefined;

export const levels: Level[] = [
	// 1 - done
	[
		[3, 5],
		[
			[EntityTurnOneSide, Rotation90], Empty, [EntityTurnOneSide, Rotation270],
			Empty, Empty, Empty,
			[EntityCollectable, Rotation0], Empty, [EntityEnd, Rotation0],
			Empty, Empty, Empty,
			[EntityStart, Rotation0, [Rotation270]], Empty, Empty,
		],
	],
	// 2 - done
	[
		[3, 4],
		[
			[EntityTurnOneSide, Rotation270], [EntityTurnOneSide, Rotation270], [EntityEnd, Rotation0],
			[EntityCollectable, Rotation0], Empty, [EntityCollectable, Rotation0],
			Empty, [EntityCollectable, Rotation0], Empty,
			[EntityStart, Rotation0, [Rotation270]], [EntityTurnOneSide, Rotation90], [EntityTurnOneSide, Rotation90],
		],
	],
	// 3 - done
	[
		[4, 8],
		[
			Empty, Empty, [EntityEnd, Rotation0], Empty,
			Empty, [EntityTurnOneSide, Rotation270], [EntitySplit, Rotation0], Empty,
			[EntityTurnOneSide, Rotation270], Empty, [EntityTurnOneSide, Rotation270], Empty,
			Empty, [EntityTurnOneSide, Rotation270], [EntityCollectable, Rotation0], [EntityTurnOneSide, Rotation270],
			[EntityTurnOneSide, Rotation270], Empty, [EntityTurnOneSide, Rotation270], Empty,
			Empty, [EntityTurnOneSide, Rotation270], [EntityCollectable, Rotation0], [EntityTurnOneSide, Rotation270],
			[EntityTurnOneSide, Rotation270], Empty, [EntityTurnOneSide, Rotation270], Empty,
			[EntityStart, Rotation0, [Rotation90]], [EntityEnd, Rotation0], Empty, Empty,
		],
	],
	// 4 - done
	[
		[5, 5],
		[
			Empty, Empty, [EntityEnd, Rotation0], Empty, Empty,
			[EntityTurnOneSide, Rotation0], [EntitySplit, Rotation0], [EntitySplit, Rotation180], [EntitySplit, Rotation0], [EntityTurnOneSide, Rotation270],
			[EntityCollectable, Rotation0], Empty, Empty, Empty, [EntityCollectable, Rotation0],
			Empty, [EntityTurnOneSide, Rotation0], [EntitySplit, Rotation0], [EntityTurnOneSide, Rotation270], Empty,
			[EntityTurnOneSide, Rotation0], [EntityTurnOneSide, Rotation0], [EntityStart, Rotation0, [Rotation0]], [EntityTurnOneSide, Rotation270], [EntityTurnOneSide, Rotation270],
		],
	],
	// 5 - done
	[
		[5, 5],
		[
			[EntityTurnOneSide, Rotation0], Empty, [EntitySplit, Rotation270], Empty, [EntityTurnOneSide, Rotation270],
			Empty, Empty, [EntityCollectable, Rotation0], Empty, Empty,
			[EntitySplit, Rotation270], [EntityCollectable, Rotation0], [EntityEnd, Rotation0], [EntityCollectable, Rotation0], [EntitySplit, Rotation270],
			Empty, Empty, [EntityTurnOneSide, Rotation180], [EntityEnd, Rotation0], Empty,
			[EntityTurnOneSide, Rotation90], Empty, [EntityStart, Rotation0, [Rotation90, Rotation180]], Empty, [EntityEnd, Rotation0],
		],
	],
	// 6 - done
	[
		[5, 5],
		[
			[EntityTurnOneSide, Rotation90], Empty, [EntityEnd, Rotation0], [EntityEnd, Rotation0], [EntityTurnOneSide, Rotation270],
			Empty, [EntityEnd, Rotation0], [EntityBlock, Rotation0], [EntityBlock, Rotation0], Empty,
			Empty, [EntitySplit, Rotation0], [EntityCollectable, Rotation0], [EntityCollectable, Rotation0], [EntitySplit, Rotation0],
			Empty, [EntityEnd, Rotation0], [EntityStart, Rotation0, [Rotation0]], [EntityStart, Rotation0, [Rotation0]], Empty,
			[EntityTurnOneSide, Rotation90], Empty, [EntityTurnOneSide, Rotation90], [EntityTurnOneSide, Rotation90], [EntityTurnOneSide, Rotation90],
		],
	],
	// 7 - done
	[
		[5, 7],
		[
			[EntityTurnOneSide, Rotation270], [EntitySplit, Rotation0], [EntityTurnOneSide, Rotation0], [EntityTurnOneSide, Rotation270], [EntityTurnOneSide, Rotation270],
			Empty, [EntityCollectable, Rotation0], [EntityEnd, Rotation0], [EntityCollectable, Rotation0], Empty,
			Empty, [EntityEnd, Rotation0], [EntityBlock, Rotation0], [EntityEnd, Rotation0], Empty,
			Empty, Empty, [EntityCollectable, Rotation0], Empty, [EntitySplit, Rotation90],
			Empty, Empty, [EntityBlock, Rotation0], Empty, Empty,
			Empty, [EntityBlock, Rotation0], [EntityStart, Rotation0, [Rotation90]], [EntityBlock, Rotation0], Empty,
			[EntityTurnOneSide, Rotation90], Empty, [EntitySplit, Rotation270], Empty, [EntityTurnOneSide, Rotation180],
		],
	],
	// 8 - done
	[
		[5, 7],
		[
			Empty, Empty, [EntityEnd, Rotation0], Empty, Empty,
			Empty, Empty, Empty, Empty, Empty,
			[EntityTurnOneSide, Rotation180], Empty, [EntityTurnBothSides, Rotation90], Empty, [EntityTurnOneSide, Rotation90],
			Empty, Empty, [EntityCollectable, Rotation0], Empty, Empty,
			[EntitySplit, Rotation0], Empty, [EntityTurnBothSides, Rotation0], Empty, [EntitySplit, Rotation0],
			[EntityCollectable, Rotation0], Empty, Empty, Empty, [EntityCollectable, Rotation0],
			[EntityEnd, Rotation0], Empty, [EntityStart, Rotation0, [Rotation270]], Empty, [EntityEnd, Rotation0],
		],
	],
	// 9 - done
	[
		[5, 6],
		[
			Empty, [EntityTurnOneSide, Rotation270], [EntityCollectable, Rotation0], [EntityEnd, Rotation0], Empty,
			[EntityTurnOneSide, Rotation0], [EntityTurnBothSides, Rotation0], [EntitySplit, Rotation270], [EntityTurnBothSides, Rotation90], [EntityTurnOneSide, Rotation270],
			[EntityCollectable, Rotation0], Empty, Empty, Empty, [EntityCollectable, Rotation0],
			[EntityTurnOneSide, Rotation270], [EntityTurnBothSides, Rotation90], [EntitySplit, Rotation0], [EntityTurnBothSides, Rotation0], [EntityTurnOneSide, Rotation90],
			Empty, [EntityTurnOneSide, Rotation180], Empty, [EntityTurnOneSide, Rotation180], Empty,
			Empty, Empty, [EntityStart, Rotation0, [Rotation0]], Empty, Empty,
		],
	],
	// 10 - done
	[
		[5, 5],
		[
			[EntityEnd, Rotation0], Empty, [EntityTurnOneSide, Rotation90], [EntitySplit, Rotation0], [EntityEnd, Rotation0],
			Empty, Empty, Empty, [EntityEnd, Rotation0], Empty,
			[EntitySplit, Rotation180], Empty, [EntityTurnBothSides, Rotation0], Empty, [EntityStart, Rotation0, [Rotation0, Rotation270]],
			[EntityCollectable, Rotation0], [EntityEnd, Rotation0], [EntityCollectable, Rotation0], Empty, [EntityCollectable, Rotation0],
			[EntityTurnOneSide, Rotation0], [EntitySplit, Rotation270], [EntityTurnOneSide, Rotation180], Empty, [EntityEnd, Rotation0],
		],
	],
	// 11 - done
	[
		[6, 8],
		[
			Empty, Empty, [EntityEnd, Rotation0], [EntityCollectable, Rotation0], Empty, [EntityTurnBothSides, Rotation0],
			Empty, [EntityTurnBothSides, Rotation0], [EntityCollectable, Rotation0], [EntityTurnBothSides, Rotation0], Empty, Empty,
			[EntityEnd, Rotation0], Empty, [EntityTunnel, Rotation0], Empty, [EntityStart, Rotation0, [Rotation0]], Empty,
			[EntityStart, Rotation0, [Rotation90]], Empty, [EntityTunnel, Rotation0], Empty, [EntityEnd, Rotation0], Empty,
			[EntityEnd, Rotation0], Empty, [EntityTunnel, Rotation0], Empty, [EntityStart, Rotation0, [Rotation180]], Empty,
			Empty, Empty, Empty, Empty, Empty, Empty,
			[EntityTurnBothSides, Rotation0], [EntityTurnBothSides, Rotation0], [EntityStart, Rotation0, [Rotation0]], [EntityTurnBothSides, Rotation0], Empty, Empty,
			[EntityTurnBothSides, Rotation0], Empty, [EntityCollectable, Rotation0], Empty, Empty, [EntityTurnBothSides, Rotation0],
		],
	],
	// 12 - done
	[
		[5, 6],
		[
			[EntityEnd, Rotation0], Empty, [EntityTurnOneSide, Rotation270], Empty, Empty,
			Empty, Empty, Empty, Empty, Empty,
			[EntityTurnOneSide, Rotation270], Empty, [EntityTurnBothSides, Rotation0], Empty, [EntityTurnOneSide, Rotation90],
			[EntityCollectable, Rotation0], Empty, [EntityCollectable, Rotation0], Empty, [EntityStart, Rotation0, [Rotation90, Rotation270]],
			[EntityTurnOneSide, Rotation90], Empty, [EntityTurnBothSides, Rotation0], [EntityStart, Rotation0, [Rotation0]], [EntityCollectable, Rotation0],
			Empty, Empty, [EntityEnd, Rotation0], Empty, [EntityEnd, Rotation0],
		],
	],
	// 13 - done
	[
		[5, 6],
		[
			Empty, Empty, [EntityEnd, Rotation0], Empty, Empty,
			Empty, [EntityTurnBothSides, Rotation90], [EntityTurnBothSides, Rotation90], Empty, [EntityTurnBothSides, Rotation90],
			Empty, [EntityCollectable, Rotation0], [EntityCollectable, Rotation0], Empty, Empty,
			Empty, [EntityCollectable, Rotation0], [EntityTurnBothSides, Rotation90], Empty, [EntitySplit, Rotation0],
			[EntityEnd, Rotation0], [EntityTurnBothSides, Rotation0], Empty, [EntityStart, Rotation0, [Rotation180]], Empty,
			[EntityEnd, Rotation0], [EntitySplit, Rotation270], Empty, Empty, [EntityTurnBothSides, Rotation0],
		],
	],
	// 14 - done
	[
		[6, 8],
		[
			Empty, [EntityTurnOneSide, Rotation180], Empty, Empty, [EntitySplit, Rotation180], [EntityTurnOneSide, Rotation0],
			Empty, [EntityTurnBothSides, Rotation90], [EntitySplit, Rotation180], [EntityTurnBothSides, Rotation90], Empty, Empty,
			Empty, Empty, [EntityTunnel, Rotation0], [EntityCollectable, Rotation0], Empty, Empty,
			Empty, [EntityTunnel, Rotation90], [EntityStart, Rotation0, [Rotation0, Rotation90, Rotation180, Rotation270]], [EntityTunnel, Rotation90], [EntityEnd, Rotation0], [EntityEnd, Rotation0],
			[EntityEnd, Rotation0], [EntityCollectable, Rotation0], [EntityTunnel, Rotation0], [EntitySplit, Rotation0], Empty, Empty,
			Empty, [EntityEnd, Rotation0], Empty, [EntitySplit, Rotation270], Empty, Empty,
			Empty, [EntityEnd, Rotation0], Empty, [EntitySplit, Rotation90], Empty, Empty,
			Empty, Empty, Empty, [EntityCollectable, Rotation0], Empty, Empty,
		],
	],
	// 15 - done
	[
		[5, 8],
		[
			[EntityTurnOneSide, Rotation270], Empty, [EntityCollectable, Rotation0], Empty, [EntityTurnOneSide, Rotation270],
			Empty, [EntityEnd, Rotation0], Empty, Empty, Empty,
			Empty, [EntitySplit, Rotation0], [EntityTurnOneSide, Rotation180], Empty, [EntityCollectable, Rotation0],
			[EntityStart, Rotation0, [Rotation90]], [EntityTunnel, Rotation90], [EntityTunnel, Rotation90], Empty, [EntityEnd, Rotation0],
			[EntityStart, Rotation0, [Rotation90]], [EntityTunnel, Rotation90], [EntityTunnel, Rotation90], [EntityEnd, Rotation0], Empty,
			[EntityStart, Rotation0, [Rotation90]], [EntityTunnel, Rotation90], [EntityTunnel, Rotation90], Empty, [EntityEnd, Rotation0],
			Empty, [EntityStart, Rotation0, [Rotation90]], [EntityEnd, Rotation0], Empty, Empty,
			[EntityTurnOneSide, Rotation270], [EntityCollectable, Rotation0], Empty, [EntitySplit, Rotation180], [EntityTurnOneSide, Rotation270],
		],
	],
	// 16
	[
		[6, 6],
		[
			Empty, [EntityEnd, Rotation0], Empty, Empty, Empty, Empty,
			[EntityEnd, Rotation0], [EntityTurnBothSides, Rotation90], [EntityTurnBothSides, Rotation90], Empty, Empty, Empty,
			Empty, [EntityTurnBothSides, Rotation90], [EntityStart, Rotation0, [Rotation0, Rotation90, Rotation180, Rotation270]], [EntityTurnBothSides, Rotation90], Empty, Empty,
			Empty, Empty, [EntityTurnBothSides, Rotation90], [EntityTurnBothSides, Rotation90], [EntityCollectable, Rotation0], [EntityEnd, Rotation0],
			Empty, Empty, Empty, [EntityCollectable, Rotation0], Empty, Empty,
			Empty, Empty, Empty, [EntityEnd, Rotation0], Empty, Empty,
		],
	],
	// 17 - done
	[
		[6, 7],
		[
			[EntityEnd, Rotation0], [EntityTurnOneSide, Rotation90], Empty, [EntityCollectable, Rotation0], Empty, [EntityEnd, Rotation0],
			Empty, Empty, [EntityTurnOneSide, Rotation270], Empty, Empty, [EntityTurnOneSide, Rotation180],
			Empty, [EntityCollectable, Rotation0], Empty, [EntityTurnOneSide, Rotation0], [EntityTurnOneSide, Rotation270], [EntityCollectable, Rotation0],
			[EntitySplit, Rotation0], Empty, Empty, [EntityTurnBothSides, Rotation0], [EntitySplit, Rotation270], Empty, 
			[EntitySplit, Rotation90], Empty, [EntityTurnBothSides, Rotation0], Empty, Empty, [EntitySplit, Rotation0],
			[EntityStart, Rotation0, [Rotation180, Rotation270]], [EntityTurnBothSides, Rotation0], [EntitySplit, Rotation0], Empty, Empty, Empty,
			Empty, [EntityEnd, Rotation0], [EntityEnd, Rotation0], [EntityEnd, Rotation0], [EntityEnd, Rotation0], [EntityEnd, Rotation0],
		],
	],
	// 18 - done
	[
		[6, 8],
		[
			Empty, [EntityEnd, Rotation0], Empty, [EntityEnd, Rotation0], Empty, [EntityEnd, Rotation0],
			[EntityTurnOneSide, Rotation180], Empty, Empty, [EntityCollectable, Rotation0], Empty, [EntitySplit, Rotation180],
			[EntityTurnOneSide, Rotation90], [EntitySplit, Rotation90], Empty, [EntityTunnel, Rotation90], Empty, [EntitySplit, Rotation180],
			Empty, Empty, [EntityTurnBothSides, Rotation0], [EntityCollectable, Rotation0], [EntityTurnBothSides, Rotation0], Empty,
			Empty, [EntityTunnel, Rotation0], Empty, Empty, Empty, [EntityTunnel, Rotation0],
			Empty, Empty, Empty, [EntityCollectable, Rotation0], [EntityStart, Rotation0, [Rotation90]], Empty,
			Empty, [EntityStart, Rotation0, [Rotation0]], [EntityEnd, Rotation0], [EntityTunnel, Rotation90], Empty, [EntitySplit, Rotation270],
			Empty, Empty, Empty, [EntityStart, Rotation0, [Rotation0]], Empty, [EntityEnd, Rotation0],
		],
	],
];
