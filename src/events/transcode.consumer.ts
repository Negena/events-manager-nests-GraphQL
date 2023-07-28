import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { transcode } from "env";

@Processor(transcode)
export class TransCodeConsumer {
    private readonly logger = new Logger(TransCodeConsumer.name)
    @Process()
    async transcode(job: Job<unknown>) {
        this.logger.log(job)
    }
}