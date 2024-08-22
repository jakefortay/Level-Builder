const DEBUG_MODE = true;

const GRID_SPACING = 10;

const COLORS = {
	DRAWING: {
		BLACK: "rgba(0, 0, 0, 0.5)",
		RED: "rgba(255, 0, 0, 0.5)",
		GREEN: "rgba(0, 255, 0, 0.5)",
		CYAN: "rgba(0, 255, 255, 0.25)",
		GRAY: "rgba(60, 60, 60, 0.5)"
	},
	SOLID: {
		BLACK: "rgba(0, 0, 0, 1)",
		RED: "rgba(255, 0, 0, 1)",
		GREEN: "rgba(0, 255, 0, 1)",
		CYAN: "rgba(0, 255, 255, 1)",
		BROWN: "rgba(117, 102, 102, 1)"
	},
	TEXT: {
		LIGHT: "rgba(255, 255, 255, 1)",
	},
};

const MODE = {
	FLOORS: 0,
	HAZARDS: 1,
	ENDPOINTS: 2,
	PLAYER_START: 3,
	DELETE: 4,
	MOVING_HAZARDS: 5
};