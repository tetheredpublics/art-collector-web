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
