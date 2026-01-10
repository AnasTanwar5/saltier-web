import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, GraduationCap, Briefcase } from "lucide-react";

interface UserInfo {
  userType: "student" | "staff" | "";
  name: string;
  rollNo: string;
}

interface UserInfoDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: (userInfo: UserInfo) => void;
}

const UserInfoDialog = ({ open, onClose, onProceed }: UserInfoDialogProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: "",
    name: "",
    rollNo: "",
  });
  const [errors, setErrors] = useState<Partial<UserInfo>>({});

  const validate = (): boolean => {
    const newErrors: Partial<UserInfo> = {};

    if (!userInfo.userType) {
      newErrors.userType = "Please select user type";
    }

    if (!userInfo.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (userInfo.userType === "student" && !userInfo.rollNo.trim()) {
      newErrors.rollNo = "Roll number is required for students";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (validate()) {
      onProceed(userInfo);
      // Reset form
      setUserInfo({ userType: "", name: "", rollNo: "" });
      setErrors({});
    }
  };

  const handleClose = () => {
    setUserInfo({ userType: "", name: "", rollNo: "" });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-wine flex items-center gap-2">
            <User className="h-5 w-5" />
            User Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* User Type Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="userType" className="text-foreground font-medium">
              User Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={userInfo.userType}
              onValueChange={(value: "student" | "staff") =>
                setUserInfo({ ...userInfo, userType: value, rollNo: "" })
              }
            >
              <SelectTrigger
                id="userType"
                className={errors.userType ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Student
                  </div>
                </SelectItem>
                <SelectItem value="staff">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Staff
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.userType && (
              <p className="text-sm text-destructive">{errors.userType}</p>
            )}
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              {userInfo.userType === "student" ? "Student Name" : "Staff Name"}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder={
                userInfo.userType === "student"
                  ? "Enter student name"
                  : "Enter staff name"
              }
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Roll No Field (Only for Students) */}
          {userInfo.userType === "student" && (
            <div className="space-y-2">
              <Label htmlFor="rollNo" className="text-foreground font-medium">
                Roll Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="rollNo"
                placeholder="Enter roll number"
                value={userInfo.rollNo}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, rollNo: e.target.value })
                }
                className={errors.rollNo ? "border-destructive" : ""}
              />
              {errors.rollNo && (
                <p className="text-sm text-destructive">{errors.rollNo}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleProceed}
              className="flex-1 rounded-full bg-wine hover:bg-wine-light text-primary-foreground"
            >
              Proceed
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoDialog;
export type { UserInfo };

