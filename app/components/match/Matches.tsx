import MatchRow from './MatchRow'
import Table from '../table/Table'
import {memo} from 'react'
import MatchTableHeadRow from './MatchTableHeadRow'
import {LEAGUE_BASE_ROUTE} from '../../constants'
import {generateHref} from '../../helpers/utilities'
import CustomNextImage from '../image/CustomNextImage'
import MatchRowWithoutLink from "./MatchRowWithoutLink";

interface MatchesProps {
    league: any,
    removeLinking?: boolean
}

const Matches = ({league, removeLinking}: MatchesProps) => {
    const {events, titleEvents, id, uniqueName, slug, logo, name} = league

    let bodyData = [
        ...events
    ]

    if (titleEvents) {
        bodyData = [...titleEvents, ...bodyData]
    }

    return <div className="matches">
        <div className="matchItem--league">
            <a title={`${name} Live Streams`} href={generateHref(LEAGUE_BASE_ROUTE, slug, id)}>
                <CustomNextImage
                    src={logo}
                    alt={uniqueName}
                    width={30}
                    height={30}
                />
                <h2 className="league-name">{uniqueName}</h2>
            </a>
        </div>
        <Table className="matchTable" head={<MatchTableHeadRow/>}
               RowComponent={removeLinking ? MatchRowWithoutLink : MatchRow}
               bodyData={bodyData}/>

    </div>
}

export default memo(Matches)