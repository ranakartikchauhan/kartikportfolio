import React from "react";

const Activity = ({ data }) => {
  const commitContributionsByRepository = data.commitContributionsByRepository;
  const contributionCalendar = data.contributionCalendar;

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      margin: "20px",
    },
    heading: {
      fontWeight: "bold",
      fontSize: "24px",
      marginBottom: "10px",
    },
    chartContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(53, 10px)", // Adjust the number of columns to match the desired width
      gridGap: "1px",
      backgroundColor: "#f2f2f2",
      padding: "20px",
      borderRadius: "5px",
      marginBottom: "20px",
    },
    dayCell: {
      width: "10px",
      height: "10px",
      borderRadius: "2px",
    },
    repositoryContainer: {
      backgroundColor: "#f2f2f2",
      padding: "20px",
      borderRadius: "5px",
      marginBottom: "10px",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease",
    },
    repositoryName: {
      fontWeight: "bold",
      fontSize: "18px",
      marginBottom: "5px",
      color: "#333",
    },
    repositoryDescription: {
      marginBottom: "5px",
      color: "#666",
    },
    repositoryLink: {
      textDecoration: "none",
      color: "#0366d6",
      marginBottom: "5px",
      fontSize: "14px",
    },
    repositoryLanguage: {
      fontStyle: "italic",
      color: "#888",
    },
    statItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "2px",
    },
    statIcon: {
      marginRight: "4px",
      fontSize: "16px",
    },
    starCount: {
      color: "#f2b01e",
      marginRight: "10px",
    },
    forkCount: {
      color: "#6cc644",
    },
    activityList: {
      marginTop: "20px",
      borderTop: "1px solid #ccc",
      paddingTop: "10px",
    },
    activityItem: {
      marginBottom: "5px",
      fontSize: "14px",
    },
  };

  const contributionsByWeek = contributionCalendar.weeks.map((week) => {
    return {
      week: week.number,
      contributions: week.contributionDays.length,
    };
  });

  const getDayCellColor = (count) => {
    if (count === 0) return "#ebedf0";
    if (count < 5) return "#c6e48b";
    if (count < 10) return "#7bc96f";
    if (count < 20) return "#239a3b";
    return "#196127";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My activities by Calendar</h2>
      <p>Total contributions: {contributionCalendar.totalContributions}</p>
      <div style={styles.chartContainer}>
        {contributionCalendar.weeks.map((week) =>
          week.contributionDays.map((day) => (
            <div
              key={day.date}
              style={{
                ...styles.dayCell,
                backgroundColor: getDayCellColor(day.contributionCount),
              }}
            />
          ))
        )}
      </div>

      <h2 style={styles.heading}>My Repositories</h2>
      {commitContributionsByRepository.map((repo) => (
        <div
          key={repo.id}
          style={styles.repositoryContainer}
          onClick={() => (window.location.href = repo.repository.url)}
        >
          <h3 style={styles.repositoryName}>{repo.repository.name}</h3>
          <p style={styles.repositoryDescription}>
            {repo.repository.description}
          </p>
          <a href={repo.repository.url} style={styles.repositoryLink}>
            {repo.repository.url}
          </a>
          <div>
            <div style={styles.statItem}>
              <i
                className="fas fa-star"
                style={{ ...styles.statIcon, ...styles.starCount }}
              ></i>
              <span>{repo.repository.stargazerCount}</span>
            </div>
            <div style={styles.statItem}>
              <i
                className="fas fa-code-branch"
                style={{ ...styles.statIcon, ...styles.forkCount }}
              ></i>
              <span>{repo.repository.forkCount}</span>
            </div>
          </div>
        </div>
      ))}

      <h2 style={styles.heading}>Activity List</h2>
      <div style={styles.activityList}>
        {commitContributionsByRepository.map((repo) => (
          <div key={repo.id} style={styles.activityItem}>
            <span>{repo.repository.name}</span> -{" "}
            {repo.contributions.nodes.length} contributions
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
