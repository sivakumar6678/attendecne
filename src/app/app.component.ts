import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'attendance';
  adminLatitude: number | null = null;
  adminLongitude: number | null = null;
  studentLatitude: number | null = null;
  studentLongitude: number | null = null;
  distance: number | null = null;

  // Method to get Admin Location
  getAdminLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.adminLatitude = parseFloat(position.coords.latitude.toFixed(6));
        this.adminLongitude = parseFloat(position.coords.longitude.toFixed(6));
        console.log('Admin Location:', this.adminLatitude, this.adminLongitude);
      },
      (error) => console.error('Error fetching admin location', error),
      { enableHighAccuracy: true }
    );
  }

  calculateDistance() {
    if (
      this.adminLatitude !== null &&
      this.adminLongitude !== null &&
      this.studentLatitude !== null &&
      this.studentLongitude !== null
    ) {
      // Use Haversine Formula to calculate the distance
      const R = 6371000; // Radius of the Earth in meters
      const dLat = this.degToRad(this.studentLatitude - this.adminLatitude);
      const dLon = this.degToRad(this.studentLongitude - this.adminLongitude);
      const lat1 = this.degToRad(this.adminLatitude);
      const lat2 = this.degToRad(this.studentLatitude);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      this.distance = R * c; // Distance in meters

      // Round the distance to two decimal places
      this.distance = parseFloat(this.distance.toFixed(2));
      console.log('Distance in meters:', this.distance);
    } else {
      console.error('Coordinates are missing for distance calculation');
      alert('Please ensure both admin and student coordinates are provided');
    }
  }
  getStudentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.studentLatitude = parseFloat(position.coords.latitude.toFixed(6));
        this.studentLongitude = parseFloat(position.coords.longitude.toFixed(6));
        console.log('Student Location:', this.studentLatitude, this.studentLongitude);
      },
      (error) => {
        console.error('Error fetching student location', error);
        alert('Unable to fetch location. Please ensure location services are enabled and set to high accuracy.');
      },
      { enableHighAccuracy: true }
    );
  }
  
  degToRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
