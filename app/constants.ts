export const UNIQUE_APP_NAME = process.env.NEXT_PUBLIC_SITE_UNIQUE_NAME
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN
export const APP_NAME = process.env.NEXT_PUBLIC_NAME
export const SPORT_NAME = process.env.NEXT_PUBLIC_SPORT
export const SPORT_SOCCER = 'soccer'
export const SPORT_BASKETBALL = 'basketball'
export const SPORT_ICE_HOCKEY = 'ice-hockey'
export const SPORT_BASEBALL = 'baseball'
export const SPORT_CRICKET = 'cricket'
export const SPORT_MOTORSPORT = 'motorsport'
export const SPORT_AMERICAN_FOOTBALL = 'american-football'
export const HAVE_STANDING_SPORTS = [SPORT_SOCCER, SPORT_AMERICAN_FOOTBALL, SPORT_BASKETBALL]
export const HAVE_LINEUP_SPORTS = [SPORT_SOCCER, SPORT_BASKETBALL, SPORT_ICE_HOCKEY, SPORT_AMERICAN_FOOTBALL]
export const MAIN_TOURNAMENT_ID = process.env.NEXT_PUBLIC_MAIN_TOURNAMENT_ID
export const MAIN_SEASON_ID = process.env.NEXT_PUBLIC_MAIN_SEASON_ID
export const CALLED_EVENT = process.env.NEXT_PUBLIC_CALLED_EVENT?.split('|')
export const EVENT_SEARCH_INPUT_PLACEHOLDER = process.env.NEXT_PUBLIC_EVENT_SEARCH_INPUT_PLACEHOLDER

export const IN_PROGRESS_EVENT_STATUS = 'inprogress'
export const WILL_CONTINUE_EVENT_STATUS = 'willcontinue'
export const NOT_STARTED_EVENT_STATUS = 'notstarted'
export const FINISHED_EVENT_STATUS = 'finished'
export const CANCELED_EVENT_STATUS = 'canceled'

export const MOTORSPORT_STANDINGS_COMPETITOR_TYPE = 'competitor'
export const MOTORSPORT_STANDINGS_TEAM_TYPE = 'team'

export const LEAGUE_BASE_ROUTE = process.env.NEXT_PUBLIC_TOURNAMENT_BASE_ROUTE
export const TEAM_BASE_ROUTE = process.env.NEXT_PUBLIC_TEAM_BASE_ROUTE

export const LINEUPS_TAB_COLS = {
    [SPORT_BASKETBALL]: {
        'Summary': [
            {
                title: 'Points',
                key: 'points'
            },
            {
                title: 'Rebounds',
                key: 'rebounds'
            },
            {
                title: 'Assists',
                key: 'assists'
            },
            {
                title: 'Minutes played',
                key: 'secondsPlayed',
                convert: 'toMinute'
            },
            {
                title: 'Position',
                key: 'position'
            }
        ],
        'Points': [
            {
                title: 'Points',
                key: 'points'
            },
            {
                title: 'Free throws',
                key: 'freeThrows'
            },
            {
                title: '2 pointers',
                key: 'twoPointers'
            },
            {
                title: '3 pointers',
                key: 'threePoints'
            },
            {
                title: 'Field goals',
                key: 'fieldGoalPct'
            },
            {
                title: 'Position',
                key: 'position'
            }
        ],
        'Rebounds': [
            {
                title: 'Rebounds',
                key: 'rebounds'
            },
            {
                title: 'Defensive rebounds',
                key: 'defensiveRebounds'
            },
            {
                title: 'Offensive rebounds',
                key: 'offensiveRebounds'
            },
            {
                title: 'Position',
                key: 'position'
            }
        ],
        'Other': [
            {
                title: 'Assists',
                key: 'assists'
            },
            {
                title: 'Turnovers',
                key: 'turnovers'
            },
            {
                title: 'Steals',
                key: 'steals'
            },
            {
                title: 'Blocks',
                key: 'blocks'
            },
            {
                title: 'Personal fouls',
                key: 'personalFouls'
            },
            {
                title: 'Position',
                key: 'position'
            },
            {
                title: '+/-',
                key: 'plusMinus'
            }

        ]
    },
    [SPORT_ICE_HOCKEY]: {
        'Summary': [
            {
                title: 'Goals',
                key: 'goals'
            },
            {
                title: 'Assists',
                key: 'assists'
            },
            {
                title: 'Shots',
                key: 'shots'
            },
            {
                title: 'Time on ice',
                key: 'secondsPlayed',
                convert: 'toMinute'
            }
        ],
        'Attacking': [
            {
                title: 'Goals',
                key: 'goals'
            },
            {
                title: 'Shots',
                key: 'shots'
            },
            {
                title: 'Assists',
                key: 'assists'
            },
            {
                title: 'Powerplay goals',
                key: 'powerPlayGoals'
            },
            {
                title: 'Powerplay assists',
                key: 'powerPlayAssists'
            },
            {
                title: 'Position',
                key: 'position'
            }
        ],
        'Defensive': [
            {
                title: 'Hits',
                key: 'hits'
            },
            {
                title: 'Takeaways',
                key: 'takeaways'
            },
            {
                title: 'Blocks',
                key: 'blocked'
            },
            {
                title: 'Position',
                key: 'position'
            }
        ],
        'Goalkeeper': [
            {
                title: 'Save percentage',
                key: 'savePercentage'
            },
            {
                title: 'Saves',
                key: 'saves'
            },
            {
                title: 'Shots against',
                key: 'shotsAgainst'
            },
            {
                title: 'Shorthanded saves',
                key: 'shortHandedSaves'
            },
            {
                title: 'Powerplay saves',
                key: 'powerPlaySaves'
            },
            {
                title: 'Even saves',
                key: 'evenSaves'
            }
        ],
        'Other': [
            {
                title: 'Penalty minutes',
                key: 'penaltyMinutes'
            },
            {
                title: 'Faceoff won',
                key: 'faceOffWins'
            },
            {
                title: 'Faceoff taken',
                key: 'faceOffTaken'
            },
            {
                title: 'Giveaways',
                key: 'giveaways'
            },
            {
                title: '+/-',
                key: 'plusMinus'
            }
        ]
    },
    [SPORT_AMERICAN_FOOTBALL]: {
        'Passing': [
            {
                title: 'Passing completions',
                key: 'passingCompletions'
            },
            {
                title: 'Passing attempts',
                key: 'passingAttempts'
            },
            {
                title: 'Passing yards',
                key: 'passingYards'
            },
            {
                title: 'Passing touchdowns',
                key: 'passingTouchdowns'
            },
            {
                title: 'Passing interceptions',
                key: 'passingInterceptions'
            },
            {
                title: 'Passing yards per attempt',
                key: 'passingYardsPerAttempt',
                convert: 'oneDecimal'
            },
            {
                title: 'Sacked',
                key: 'passingSacked'
            }
        ],
        'Rushing': [
            {
                title: 'Rushing attempts',
                key: 'rushingAttempts'
            },
            {
                title: 'Rushing yards',
                key: 'rushingYards'
            },
            {
                title: 'Rushing touchdowns',
                key: 'rushingTouchdowns'
            },
            {
                title: 'Longest rush',
                key: 'rushingLongest'
            },
            {
                title: 'Rushing yards per attempt',
                key: 'rushingYardsPerAttempt',
            },
        ],
        'Receiving': [
            {
                title: 'Receptions',
                key: 'receivingReceptions'
            },
            {
                title: 'Receiving yards',
                key: 'receivingYards'
            },
            {
                title: 'Receiving touchdowns',
                key: 'receivingTouchdowns'
            },
            {
                title: 'Longest reception',
                key: 'receivingLongest'
            },
            {
                title: 'Yards per reception',
                key: 'receivingYardsPerReception',
                convert: 'oneDecimal'
            }
        ],
        'Defensive': [
            {
                title: 'Combine tackles',
                key: 'defensiveCombineTackles'
            },
            {
                title: 'Assist tackles',
                key: 'defensiveAssistTackles'
            },
            {
                title: 'Sacks',
                key: 'defensiveSacks'
            },
            {
                title: 'Passes defensed',
                key: 'defensivePassesDefensed'
            },
            {
                title: 'Interceptions',
                key: 'defensiveInterceptions'
            },
            {
                title: 'Interceptions touchdowns',
                key: 'defensiveForcedFumbles'
            },
            {
                title: 'Interceptions yards',
                key: 'defensiveInterceptionsYards'
            },
        ],
        'Fumbles': [
            {
                title: 'Fumbles',
                key: 'fumbleFumbles'
            },
            {
                title: 'Fumbles lost',
                key: 'fumbleLost'
            },
            {
                title: 'Fumble recoverles',
                key: 'fumbleRecovery'
            },
            {
                title: 'Fumble return touchdowns',
                key: 'fumbleTouchdownReturns'
            }
        ],
        'Kicking': [
            {
                title: 'Field goals made',
                key: 'kickingFgMadePercent'
            },
            {
                title: 'Extra points made',
                key: 'kickingExtraMadePercent'
            },
            {
                title: 'Field goals blocked',
                key: 'fieldGoalsBlocked'
            },
            {
                title: 'Longest field goal made',
                key: 'kickingFgLong'
            },
            {
                title: 'Total points',
                key: 'kickingTotalPoints'
            },
        ],
        'Punting': [
            {
                title: 'Punts',
                key: 'puntingTotal'
            },
            {
                title: 'Punting yards',
                key: 'puntingYards'
            },
            {
                title: 'Punting net yards',
                key: 'puntingNetYards'
            },
            {
                title: 'Longest punt',
                key: 'puntingLongest'
            },
            {
                title: 'Punts blocked',
                key: 'puntingBlocked'
            },
            {
                title: 'Touchbacks',
                key: 'puntingTouchbacks'
            },
            {
                title: 'Punts inside 20',
                key: 'puntingInside20'
            },
            {
                title: 'Yards per punt',
                key: 'puntingYardsPerPuntAvg'
            }
        ],
        'Kick Returns': [
            {
                title: 'Kick returns total',
                key: 'kickReturnsTotal'
            },
            {
                title: 'Kick returns yards',
                key: 'kickReturnsYards'
            },
            {
                title: 'Kick returns touchdowns',
                key: 'kickReturnsTouchdowns'
            },
            {
                title: 'Kick returns average yards',
                key: 'kickReturnsAverageYards'
            },
            {
                title: 'Longest kick return',
                key: 'kickReturnsLong'
            }
        ],
        'Punt Returns': [
            {
                title: 'Punt returns total',
                key: 'puntReturnsTotal'
            },
            {
                title: 'Punt returns yards',
                key: 'puntReturnsYards'
            },
            // {
            //     title: 'Punt returns average yards',
            //     key: 'puntingYardsPerPuntAvg'
            // },
            // {
            //     title: 'Punt returns touchdowns',
            //     key: 'puntingYardsPerPuntAvg'
            // },
            {
                title: 'Longest punt return',
                key: 'puntReturnsLong'
            },
        ]
    }

}

export const DEFAULT_NEWS_QUERY = process.env.NEXT_PUBLIC_DEFAULT_NEWS_QUERY
