import { Phasor, ReadyPhase } from "@ax/phasors"
import { ReducerBit } from "../state.api.types"

type Getter<T, I> = (arg: I) => Promise<T>
