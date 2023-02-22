export default function NoData(props: { message: string }) {
  return (
    <div>
      <h1>Opss</h1>
      <p>{props.message}</p>
    </div>
  );
}
