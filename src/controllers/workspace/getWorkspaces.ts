import Workspace from "../../models/Workspace";
import { IUser } from "../../models/User";

async function getWorkspaces(req: any, res: any) {
  const { workspaces } = req.user as IUser;

  try {
    const workspacesArr = await Workspace.find({
      _id: {
        $in: [...workspaces],
      },
    });
    if (workspacesArr.length === undefined) {
      return res.status(404).json({ message: "No workspaces found" });
    }
    return res.status(200).json(workspacesArr);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export default getWorkspaces;
