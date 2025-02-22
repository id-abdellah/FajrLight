import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { RooteState } from "../../../store/store";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GeoCity, GeocodingResponse, SelectOption } from "../types";
import { API } from "../../../utils/API";
import { useDispatch } from "react-redux";
import { setLocation } from "../../../store/slices/settings";

export default function LocationSearch() {
    const locationState = useSelector((state: RooteState) => state.settings.prayerTimes.location)
    const dispatch = useDispatch()
    const [cityQuery, setCityQuery] = useState("")
    const popoverRef = useRef<HTMLDivElement | null>(null)

    const { data } = useQuery({
        queryKey: ["geocodingCities", cityQuery],
        queryFn: () => API.geocoding(cityQuery),
        enabled: cityQuery.length >= 3,
        select: (data: GeocodingResponse): SelectOption[] => {
            const options: SelectOption[] = data.map((city: GeoCity) => {
                return {
                    name: city.name,
                    country: city.country,
                    dispatchedLocation: {
                        latitude: city.lat,
                        longitude: city.lon,
                        city: city.name,
                        city_ar: city.local_names?.ar ? city.local_names.ar : "",
                        countryCode: city.country
                    }
                }
            })
            return options
        },
        initialData: []
    })


    function disptachLocation(data: SelectOption["dispatchedLocation"]) {
        dispatch(setLocation(data))
        setCityQuery("")
        popoverRef.current?.hidePopover()
    }

    return (
        <div className="relative w-[180px] [anchor-name:--search-anchor]">
            <input
                type="text"
                placeholder={`منطقتك الحالية: ${locationState.city_ar ? locationState.city_ar : locationState.city} (${locationState.countryCode})`}
                value={cityQuery}
                onChange={(e) => setCityQuery(e.target.value)}
                onClick={() => popoverRef.current && popoverRef.current.showPopover()}
                className="w-full placeholder:text-sm p-1 pl-5 rounded-sm bg-surface text-on_bg focus:outline-none" />

            <div className="absolute top-1/2 left-1.5 -translate-y-1/2 text-xs" popoverTarget="SearchLocationResults">
                <FontAwesomeIcon icon={faSearch} />
            </div>



            <div className="[position-anchor:--search-anchor] [top:calc(anchor(bottom)+10px)] [left:anchor(left)] p-2 bg-surface text-on_bg w-[180px] rounded-sm inset-auto" id="SearchLocationResults" popover="auto" ref={popoverRef}>
                {
                    data.length === 0
                        ?
                        <div className="text-on_surface text-xs text-center">No Data</div>
                        :
                        data.map((c: SelectOption) => {
                            return (
                                <div
                                    key={String(c.dispatchedLocation.latitude)}
                                    onClick={() => disptachLocation(c.dispatchedLocation)}
                                    className="text-xs p-2 cursor-pointer hover:bg-bg">
                                    {c.name} {", " + c.dispatchedLocation.countryCode}
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}