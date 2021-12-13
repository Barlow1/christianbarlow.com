import {
  MemoryDBClient,
  BatchUpdateClusterCommand,
} from "@aws-sdk/client-memorydb";



const update = () => {
  // a client can be shared by different commands.
  const client = new MemoryDBClient({ region: "us-east-1" });

  const params = {
    ClusterNames: ["contentdb"],
    /** input parameters */
  };
  const command = new BatchUpdateClusterCommand(params);

  client.send(command)
}