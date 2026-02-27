export interface SharedCollector {
	username: string;
	avatar_url?: string | null;
	avatar_color?: string | null;
}

export interface SharedArtworkItem {
	title?: string | null;
	artist?: string | null;
	year?: string | number | null;
	medium?: string | null;
	image_url?: string | null;
	collection?: unknown;
}

export interface SharedActivity {
	collector?: SharedCollector | null;
	time?: string | null;
	action_icon?: string | null;
	action_label?: string | null;
	activity?: unknown;
}

export interface SharedContent {
	collector?: SharedCollector | null;
	item?: SharedArtworkItem | null;
	activity?: SharedActivity | null;
}

export interface SharedContentPageData {
	content?: SharedContent | null;
	error?: string | null;
}

// ---------------------------------------------------------------------------
// Leaderboard — raw API response types (spec §4.1)
// ---------------------------------------------------------------------------

export interface LeaderboardMetricResponse {
	icon: string;
	label: string;
	value: number;
}

export interface LeaderboardEntryResponse {
	username: string;
	avatar_url: string;
	avatar_color: string;
	rank: number;
	points: number;
	rank_delta: number;
	is_last_weeks_winner: boolean | null;
	is_current_user: boolean | null;
	metrics: LeaderboardMetricResponse[];
}

export interface LeaderboardCategoryResponse {
	category_id: string;
	label: string;
	icon: string;
	api_empty_message: {
		title: string | null;
		body: string;
		icon: string | null;
	} | null;
	entries: LeaderboardEntryResponse[];
}

export interface LeaderboardResponse {
	week_starting: string;
	week_ending: string;
	rules_url: string | null;
	categories: LeaderboardCategoryResponse[];
}

// ---------------------------------------------------------------------------
// Leaderboard — display state types (spec §4.2)
// ---------------------------------------------------------------------------

export interface MetricDisplay {
	iconSrc: string;
	label: string;
	value: number;
}

export interface EntryDisplay {
	username: string;
	avatarUrl: string;
	avatarColorHex: string;
	avatarDividerHex: string;
	rank: number;
	rankLabel: string;
	displayPoints: string;
	rankTrend: 'up' | 'down' | 'same';
	isLastWeeksWinner: boolean;
	metrics: MetricDisplay[];
}

export interface CategoryDisplay {
	id: string;
	label: string;
	iconSrc: string;
	entries: EntryDisplay[];
	emptyTitle: string;
	emptyBody: string;
}

export interface LeaderboardDisplayState {
	weekDateRange: string;
	winnersTimeLabel: string;
	rulesUrl: string | null;
	categories: CategoryDisplay[];
}
