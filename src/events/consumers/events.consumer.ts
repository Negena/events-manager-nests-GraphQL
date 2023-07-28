import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { transcode } from "env";

@Processor(transcode)
export class EventsConsumer {
    private readonly logger = new Logger(EventsConsumer.name)
    
    @Process()
    async transcode(job: Job<unknown>) {

        this.logger.log(`msg: ${job.id}` )
        this.logger.debug("Date", job.data)
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000))
        this.logger.log("request/response is completed")
    }
}