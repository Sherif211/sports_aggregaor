import {memo, useEffect, useState} from 'react'
import Card from '../../card/Card'
import LineupTabs from './tabs/LineupTabs'
import LineupsTable from './tables/LineupsTable'
import {
    LINEUPS_TAB_COLS,
    SPORT_AMERICAN_FOOTBALL,
    SPORT_BASKETBALL,
    SPORT_ICE_HOCKEY,
    SPORT_NAME
} from '../../../constants'


const LineupsTypeTwo = ({lineups, homeTeam, awayTeam}) => {
    const [selectedTab, setSelectedTab] = useState(Object.keys(LINEUPS_TAB_COLS[SPORT_NAME])[0])
    const defaultSortKey = LINEUPS_TAB_COLS[SPORT_NAME][selectedTab][0].key
    const [players, setPlayers] = useState([])
    const [sorts, setSorts] = useState({key: defaultSortKey, type: 'desc'})

    const additionalData = (item, home) => {
        if (SPORT_NAME === SPORT_BASKETBALL) {
            return {
                ...item,
                home: home,
                statistics: {
                    ...item.statistics,
                    twoPointers: (item.statistics.twoPointsMade && item.statistics.twoPointAttempts) ? Math.round((item.statistics.twoPointsMade / item.statistics.twoPointAttempts) * 100) : 0,
                    threePoints: (item.statistics.threePointsMade / item.statistics.threePointAttempts) ? Math.round((item.statistics.threePointsMade / item.statistics.threePointAttempts) * 100) : 0,
                    freeThrows: (item.statistics.freeThrowsMade / item.statistics.freeThrowAttempts) ? Math.round((item.statistics.freeThrowsMade / item.statistics.freeThrowAttempts) * 100) : 0
                }
            }
        }

        if (SPORT_NAME === SPORT_AMERICAN_FOOTBALL) {
            if (item.statistics.kickingFgMade) {
                return {
                    ...item,
                    home: home,
                    statistics: {
                        ...item.statistics,
                        kickingFgMadePercent: `${item.statistics.kickingFgMade}/${item.statistics.kickingFgAttempts} (${Math.round(item.statistics.kickingFgMade / item.statistics.kickingFgAttempts) * 100}%)`,
                        kickingExtraMadePercent: `${item.statistics.kickingExtraMade}/${item.statistics.kickingExtraAttempts} (${Math.round(item.statistics.kickingExtraMade / item.statistics.kickingExtraAttempts) * 100}%)`,
                        fieldGoalsBlocked:  item.statistics.kickingFgAttempts - item.statistics.kickingFgMade,
                        kickingTotalPoints:  item.statistics.kickingExtraAttempts - item.statistics.kickingExtraMade,
                    }
                }
            }
        }
        return {
            ...item,
            home: home
        }
    }

    const homePlayers = lineups?.home?.players?.map(item => {
        return additionalData(item, true)
    })

    const awayPlayers = lineups?.away?.players.map(item => {
        return additionalData(item, false)
    })


    const sort = (key) => {
        const descSort = () => {
            if (key !== 'position') {
                players.sort((a, b) => b.statistics?.[key] - a.statistics?.[key])
            } else {
                players.sort((a, b) => {
                    if (a?.[key] < b?.[key]) {
                        return -1
                    }
                    if (a?.[key] > b?.[key]) {
                        return 1
                    }
                    return 0
                })
            }
            setSorts({key, type: 'desc'})
        }

        const ascSort = () => {
            if (key !== 'position') {
                players.sort((a, b) => a.statistics?.[key] - b.statistics?.[key])
            } else {
                players.sort((a, b) => {
                    if (a?.[key] > b?.[key]) {
                        return -1
                    }
                    if (a?.[key] < b?.[key]) {
                        return 1
                    }
                    return 0
                })
            }
            setSorts({key, type: 'asc'})
        }

        if (sorts.key === key) {
            if (sorts.type === 'desc') {
                ascSort()
            } else {
                descSort()
            }
        } else {
            descSort()
        }
    }

    useEffect(() => {
        setPlayers([...players])
    }, [sorts])

    useEffect(() => {
        if (lineups) {
            defaultSort()
        }
    }, [lineups])

    const onWhichLineupClick = (selectedKey) => {
        if (selectedKey === '#both') {
            defaultSort()
        } else if (selectedKey === '#home') {
            setPlayers([...homePlayers])
        } else {
            setPlayers([...awayPlayers])
        }
    }

    const defaultSort = () => {
        setPlayers([...homePlayers, ...awayPlayers].filter(item => item.statistics.hasOwnProperty(defaultSortKey)).sort((a, b) => b.statistics?.[defaultSortKey] - a.statistics?.[defaultSortKey]))
    }

    const tabs = Object.keys(LINEUPS_TAB_COLS[SPORT_NAME])
    const cols = LINEUPS_TAB_COLS[SPORT_NAME][selectedTab]

    useEffect(() => {
        let playersChanged = false
        if (SPORT_ICE_HOCKEY) {
            if (selectedTab === 'Goalkeeper') {
                setPlayers([...homePlayers, ...awayPlayers].filter(item => (item.statistics).hasOwnProperty('savePercentage')))
                playersChanged = true
            }
        }
        if (!playersChanged && homePlayers) {
            defaultSort()
        }
    }, [selectedTab])

    console.log(players)
    return <Card>
        <LineupTabs setSelectedTab={setSelectedTab} tabs={tabs}/>
        <LineupsTable cols={cols} sorts={sorts} sort={sort} onWhichLineupClick={onWhichLineupClick}
                      awayTeam={awayTeam}
                      homeTeam={homeTeam} players={players}/>
    </Card>

}

export default memo(LineupsTypeTwo)
