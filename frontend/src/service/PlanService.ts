import {
  delete_request_header,
  get_request_header,
  post_request_header,
  put_request_header,
  root_path,
} from "./global";
import { IPlan } from "../interface";

export const GetPlans = async (): Promise<IPlan[]> => {
  return await fetch(`${root_path}plans`, await get_request_header())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const AddPlan = async ({
  content,
  due,
}: {
  content: string;
  due: Date;
}) => {
  return await fetch(
    `${root_path}plan/add`,
    await post_request_header(JSON.stringify({ content: content, due: due }))
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const PutPlan = async ({
  id,
  content,
  due,
  finished,
}: {
  id: number;
  content?: string;
  due?: Date;
  finished?: boolean;
}) => {
  return await fetch(
    `${root_path}plan/add`,
    await put_request_header(
      JSON.stringify({ id: id, content: content, due: due, finished: finished })
    )
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const DeletePlan = async ({ id }: { id: number }) => {
  return await fetch(
    `${root_path}plan/add`,
    await delete_request_header(JSON.stringify({ id: id }))
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
