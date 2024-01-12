function GetTrainClasses({ data }) {
  
  if (!data || !data.data || !Array.isArray(data.data)) {
    return null;
  }

  const renderTableRows = (data) => {
    const stations = data.data.join(', '); // Join stations into a single string
    return (
      <div>
        {stations}
      </div>
    );
  };

  return (
    <div>
      <div className="table-data">
          Train Classes {renderTableRows(data)}
      </div>
    </div>
  );
}

export default GetTrainClasses;