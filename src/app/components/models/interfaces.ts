export interface Match {
    begin_at:              Date;
    detailed_stats:        boolean;
    draw:                  boolean;
    end_at:                null;
    forfeit:               boolean;
    game_advantage:        null;
    games:                 Game[];
    id:                    number;
    league:                League;
    league_id:             number;
    live:                  Live;
    match_type:            string;
    modified_at:           Date;
    name:                  string;
    number_of_games:       number;
    opponents:             OpponentElement[];
    original_scheduled_at: Date;
    rescheduled:           boolean;
    results:               Result[];
    scheduled_at:          Date;
    serie:                 Serie;
    serie_id:              number;
    slug:                  string;
    status:                string;
    streams_list:          StreamsList[];
    tournament:            Tournament;
    tournament_id:         number;
    videogame:             Videogame;
    videogame_version:     null;
    winner:                null;
    winner_id:             null;
    winner_type:           string;
}

export interface Game {
    begin_at:       Date | null;
    complete:       boolean;
    detailed_stats: boolean;
    end_at:         Date | null;
    finished:       boolean;
    forfeit:        boolean;
    id:             number;
    length:         number | null;
    match_id:       number;
    position:       number;
    status:         string;
    winner:         Winner;
    winner_type:    string;
}

export interface Winner {
    id:   number | null;
    type: string;
}

export interface League {
    id:          number;
    image_url:   string;
    modified_at: Date;
    name:        string;
    slug:        string;
    url:         null;
}

export interface Live {
    opens_at:  null;
    supported: boolean;
    url:       null;
}

export interface OpponentElement {
    opponent: OpponentOpponent;
    type:     string;
}

export interface OpponentOpponent {
    acronym:     null;
    id:          number;
    image_url:   string;
    location:    string;
    modified_at: Date;
    name:        string;
    slug:        string;
}

export interface Result {
    score:   number;
    team_id: number;
}

export interface Serie {
    begin_at:    Date;
    end_at:      Date;
    full_name:   string;
    id:          number;
    league_id:   number;
    modified_at: Date;
    name:        null;
    season:      null;
    slug:        string;
    winner_id:   null;
    winner_type: null;
    year:        number;
}

export interface StreamsList {
    embed_url: string;
    language:  string;
    main:      boolean;
    official:  boolean;
    raw_url:   string;
}

export interface Tournament {
    begin_at:       Date;
    end_at:         Date;
    has_bracket:    boolean;
    id:             number;
    league_id:      number;
    live_supported: boolean;
    modified_at:    Date;
    name:           string;
    prizepool:      null;
    serie_id:       number;
    slug:           string;
    tier:           string;
    winner_id:      null;
    winner_type:    string;
}

export interface Videogame {
    id:   number;
    name: string;
    slug: string;
}